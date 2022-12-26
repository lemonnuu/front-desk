import { imgApiService, likepoemsService } from '../utils/request'
import randomName from '../utils/randomName'
import { templateRef } from '@vueuse/core'

/**
 * 获取一张真人/动漫/风景调用
 * params：
 * zd	否	string	输出壁纸的终端[mobile|pc|zsy] 为空输出pc 竖图|横图|自适应
 * fl	否	string	选择输出分类[meizi|dongman|fengjing|suiji] 为空随机输出
 * gs	否	string	输出壁纸格式[json|images] 默认为images
 */
const getImg = (otherParams) => {
  return imgApiService({
    url: '/api.php',
    params: {
      zd: 'zsy',
      gs: 'json',
      ...otherParams
    }
  })
}

/**
 * 获取一条毒鸡汤
 */
const getDujitang = () => {
  return likepoemsService({
    url: '/ana/yiyan/',
    params: {
      type: 'json'
    }
  })
}

const zdArr = ['mobile', 'pc']

export const getImgApiLsit = async (params = { fl: 'suiji' }, imgCount = 10) => {
  const imgListPromiseArr = []
  const sentenceListPromiseArr = []
  for (let i = 0; i < (imgCount || 1); i++) {
    params.zd = zdArr[Math.floor(Math.random() * 2)]
    imgListPromiseArr.push(getImg(params))
    sentenceListPromiseArr.push(getDujitang())
  }
  const sentenceList = await Promise.all(sentenceListPromiseArr)
  const imgList = (await Promise.all(imgListPromiseArr)).map((item, index) => {
    return {
      id: item.imgurl + index + Date.now(),
      photo: item.imgurl,
      title: sentenceList[index],
      author: randomName(),
      avatar: item.imgurl,
      photoWidth: item.width,
      photoHeight: item.height
    }
  })
  return imgList
}

/**
 * 获取一张 Cos 图片
 */
const getCosImg = () => {
  return imgApiService({
    url: '/cos.php',
    params: {
      return: 'json'
    }
  })
}

/**
 * 获取 Cos 图片数据列表, 这里自己拼接个数, 会返回宽高, 不需要计算宽高
 */
export const getImgApiCosWithWH = async (imgCount) => {
  const imgListPromiseArr = []
  for (let i = 0; i < (imgCount || 1); i++) {
    imgListPromiseArr.push(getCosImg())
  }
  const imgList = (await Promise.all(imgListPromiseArr)).map((item, index) => {
    const title = item.imgurl.split('imgapi.cn/')[1].split('/')[0]
    return {
      id: item.imgurl + index + Date.now(),
      photo: item.imgurl,
      title,
      author: title.split(' ')[0],
      avatar: item.imgurl,
      photoWidth: item.width,
      photoHeight: item.height
    }
  })
  return imgList
}

/**
 * 获取 Cos 图片数据列表, 不会返回宽高, 只有十条数据
 */
export const getImgApiCosNoWH = async () => {
  const { imgurls } = await imgApiService({
    url: '/cos.php',
    params: {
      return: 'jsonpro'
    }
  })
  const imgList = imgurls.map((item, index) => {
    const title = item.split('imgapi.cn/')[1].split('/')[0]
    return {
      id: item + index + Date.now(),
      photo: item,
      title,
      author: title.split(' ')[0],
      avatar: item
    }
  })
  return imgList
}

/**
 * 获取一张 bing 图
 */
const getBingImg = (otherParams) => {
  return imgApiService({
    url: '/bing.php',
    params: {
      info: true,
      ...otherParams
    }
  })
}

export const getBingImgList = async () => {
  const imgListPromiseArr = []
  for (let i = 1; i <= 7; i++) {
    // 过去 7 天的每日 bing 图
    imgListPromiseArr.push(getBingImg({ day: i }))
  }
  const imgList = (await Promise.all(imgListPromiseArr)).map((item, index) => {
    const arr = item.split(',')
    const title = arr[0].split('title:')[1]
    const url = arr[1].split('url:')[1]
    const time = arr[3].split('time:')[1].replace('}', '')
    const temp = url.split('_')
    const widthAndHeight = temp[temp.length - 1].split('.')[0].split('x')
    console.log(arr, title, url, time)
    return {
      id: time + index + Date.now(),
      photo: url,
      title: title,
      author: time,
      avatar: url,
      photoWidth: widthAndHeight[0],
      photoHeight: widthAndHeight[1]
    }
  })
  return imgList
}

/**
 * 随机 loading 图片
 */
export const getLoadingImg = async () => {
  const { imgurl, width, height } = await imgApiService({
    url: '/loading.php',
    params: {
      return: 'json'
    }
  })
  return {
    photo: imgurl,
    photoWidth: width,
    photoHeight: height
  }
}
