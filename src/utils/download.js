/**
 * 通过图片链接转化为 base64 或 blobUrl
 * @param {String} imgSrc 图片链接
 */
export const transformImgfromSrc = (imgSrc) => {
  return new Promise((resolve, reject) => {
    let img = new Image()

    img.onload = async () => {
      resolve(await transformImg(img))
      img = null
    }
    img.onerror = () => {
      reject(new Error('后台图片加载发生错误'))
      img = null
    }
    img.src = imgSrc
  })
}

/**
 * 此方法只能转化 『支持跨域』 的图片, 否则会抛出跨域错误
 * @param {HTMLImageElement} img new Image() 生成的对象
 * @param {Boolean} toBase64 是否转化为 base64, 默认为 false 转化为 blobURl
 * @param {Number} maxWidth 最大宽度
 * @param {Number} maxHeight 最大高度
 */
export const transformImg = (
  img,
  toBase64 = false,
  maxWidth = Number.MAX_VALUE,
  maxHeight = Number.MAX_VALUE
) => {
  return new Promise((resolve) => {
    img.setAttribute('crossOrigin', 'Anonymous')
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const { width, height } = img
    let targetWidth = width
    let targetHeight = height
    // 如果传入了转化后图片最大宽高, 则用传入的
    if (width > maxWidth || height > maxHeight) {
      if (width > height) {
        targetWidth = maxWidth
        targetHeight = Math.round(maxWidth * (height / width))
      } else {
        targetHeight = maxHeight
        targetWidth = Math.round(maxHeight * (width / height))
      }
    }
    canvas.width = targetWidth
    canvas.height = targetHeight
    context.clearRect(0, 0, targetWidth, targetHeight)
    context.drawImage(img, 0, 0, targetWidth, targetHeight)
    if (toBase64) {
      // 转化为 base64
      resolve(canvas.toDataURL('image/jpeg'))
    } else {
      // 转化为 blob url
      canvas.toBlob((blobData) => {
        if (!blobData) return
        const blobUrl = URL.createObjectURL(blobData)
        resolve(blobUrl)
      })
    }
  })
}

/**
 * 生成 a 标签添加 download 属性下载资源
 */
export const downloadResource = (downloadSrc, targetName) => {
  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = downloadSrc
  link.setAttribute('download', targetName)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  downloadSrc.startsWith('blob:') && URL.revokeObjectURL(downloadSrc)
}
