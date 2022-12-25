import request from '../utils/imgapiRequest'

/**
 * 获取真人/动漫/风景调用
 * params：
 * zd	否	string	输出壁纸的终端[mobile|pc|zsy] 为空输出pc 竖图|横图|自适应
 * fl	否	string	选择输出分类[meizi|dongman|fengjing|suiji] 为空随机输出
 * gs	否	string	输出壁纸格式[json|images] 默认为images
 */
export const getImgApi = (params) => {
  return request({
    url: '/api.php',
    params
  })
}

/**
 * 获取一张 Cos 图片
 */
const getCosImg = () => {
  return request({
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
  const { imgurls } = await request({
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
