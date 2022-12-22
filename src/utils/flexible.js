import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'
import { PC_DEVICE_WIDTH } from '@/constants'

const { width } = useWindowSize()
console.log(width.value)

/**
 * 判断当前设备是否为移动设备, 根据屏幕宽度是否小于指定宽度判断(1280)
 */
export const isMobileTerminal = computed(() => {
  return PC_DEVICE_WIDTH > width.value
})

/**
 * 真正的判断当前设备是否为移动设备
 */
export const realIsMobileTerminal = computed(() => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
})

/**
 * 初始化 rem 基准值，最大为 40px
 */
export const useREM = () => {
  // 定义最大的 fontSize
  const MAX_FONT_SIZE = 40
  document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement
    let fontSize = window.innerWidth / 10
    fontSize > MAX_FONT_SIZE && (fontSize = MAX_FONT_SIZE)
    html.style.fontSize = fontSize + 'px'
  })
}

/**
 * 将字符串转化为 kebab-case 形式
 */
export const toKebabCase = (str) => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}
