export const PC_DEVICE_WIDTH = 1280 // 指定 PC 设备最小宽度
export const ALL_CATEGORY_ITEM = {
  // category 全部项
  id: 'all',
  name: '全部'
}
export const THEME_LIGHT = 'THEME_LIGHT' // 极简白
export const THEME_DARK = 'THEME_DARK' // 极简黑
export const THEME_SYSTEM = 'THEME_SYSTEM' // 跟随系统

export const CATEGORY = {
  COS: 'cos',
  BEAUTY: 'beauty',
  CARTOON: 'cartoon',
  LANDSCAPE: 'landscape',
  BING: 'bing'
}

// 图片转接接口, 以免跨域
export const downloadBaseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3000/api/v1/images/download'
    : 'https://www.moyo.love/api/v1/images/download'

// 登录方式
export const LOGIN_TYPE_USERNAME = 'username'
