import request from '../utils/request'
import randomName from '../utils/randomName'
import { CATEGORY } from '../constants'

export const getImgApiLsit = async (params = { category: 'suiji', count: 1 }) => {
  let data = await request({
    url: '/images',
    params
  })
  if (!Array.isArray(data)) {
    data = data ? [data] : []
  }
  const sentenceData = await request({
    url: '/sentence',
    params: {
      count: params.count
    }
  })
  const res = data.map((item, index) => {
    let author = randomName()
    let title = sentenceData[index]
    if (item.detail) {
      if (params.category === CATEGORY.BING) {
        const temp = item.detail.split('(')
        author = temp[1].replace(')', '').trim()
        title = temp[0].trim()
      } else {
        const temp = item.detail.split(' ')
        author = temp[0].replace('一', '')
        title = temp[temp.length - 1].replace('一', '')
      }
    }
    return {
      id: item.imgurl + index + Date.now(),
      photo: item.imgurl,
      title,
      author,
      avatar: item.imgurl,
      photoWidth: item.width,
      photoHeight: item.height
    }
  })
  return res
}

export const getBingImgList = async () => {
  const res = await getImgApiLsit({
    count: 8,
    category: 'bing',
    format: 'json'
  })
  console.log('=======', res)
  return res
}

/**
 * 获取 QQ 信息
 */
export const getQQInfo = async (qq) => {
  return await request({
    url: `/images/qq/${qq}`
  })
}

/**
 * 模拟搜索文本提示
 */
export const getSearchHint = async () => {
  console.log('搜索提示接口触发')
  const randomCount = Math.floor(Math.random() * 7) + 1
  const sentenceData = await request({
    url: '/sentence',
    params: {
      count: randomCount
    }
  })
  return sentenceData
}
