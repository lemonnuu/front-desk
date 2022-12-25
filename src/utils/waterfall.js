/**
 * 从 itemElements 中抽离出所有的 imgElements
 */
export const getImgElements = (itemElements) => {
  const imgElements = []
  itemElements.forEach((el) => {
    imgElements.push(el.querySelector('img'))
  })
  return imgElements
}

/**
 * 生成所有图片的链接数组
 */
export const getAllImg = (imgElements) => imgElements.map((imgElement) => imgElement.src)

/**
 * 监听图片加载完成
 */
export const onComplateImgElements = (imgElements) => {
  // promise 集合
  const promiseAll = []
  imgElements.forEach((imgEle, index) => {
    promiseAll[index] = new Promise((resolve, reject) => {
      const src = imgEle.src
      const resInfo = { src, index }
      if (imgEle.onload) {
        console.log('已经注册过渲染事件')
        return resolve(resInfo)
      }
      imgEle.onload = () => {
        console.log('加载完成', index, src)
        resolve(resInfo)
      }
      imgEle.onerror = () => {
        console.log('加载失败', index, src)
        reject(resInfo)
      }
    })
  })
  return Promise.allSettled(promiseAll)
}

/**
 * 返回列高对象中最小高度
 */
export const getMinHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.min(...columnHeightArr)
}

/**
 * 返回列高对象中最大高度
 */
export const getMaxHeight = (columnHeightObj) => {
  const columnHeightArr = Object.values(columnHeightObj)
  return Math.max(...columnHeightArr)
}

/**
 * 返回列高对象中最小高度所在的列
 */
export const getMinHeightColumn = (columnHeightObj) => {
  // 拿到最小高度
  const minHeight = getMinHeight(columnHeightObj)
  return Object.keys(columnHeightObj).find((key) => {
    return columnHeightObj[key] === minHeight
  })
}
