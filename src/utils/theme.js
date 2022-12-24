import { watch } from 'vue'
import { useThemeStore } from '../stores/theme'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '../constants'

/**
 * 监听主题变更
 */
let matchMedia
const watchSystemThemeChange = () => {
  if (matchMedia) return
  matchMedia = window.matchMedia('(prefers-color-scheme: dark)')
  matchMedia.onchange = () => changeTheme(THEME_SYSTEM)
}

/**
 * 变更主题方法
 * @param {String} theme 主题
 */
const changeTheme = (theme) => {
  let themeClassName = ''
  switch (theme) {
    case THEME_LIGHT:
      themeClassName = 'light'
      break
    case THEME_DARK:
      themeClassName = 'dark'
      break
    case THEME_SYSTEM:
      watchSystemThemeChange()
      themeClassName = matchMedia.matches ? 'dark' : 'light'
      break
  }
  document.documentElement.className = themeClassName
}

/**
 * 初始化主题
 */
export default () => {
  const themeStore = useThemeStore()
  // 1. 当主题发生改变时, 或者进入系统时, 进行 html class 的配置
  watch(() => themeStore.themeType, changeTheme, {
    immediate: true
  })
}
