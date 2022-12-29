<script>
const EMITS_CLOSE = 'close'
const EMITS_SUCCESS = 'success'
</script>

<script setup>
import SvgIcon from '../../../libs/SvgIcon.vue'
import '@/vendors/SliderCaptcha/slidercaptcha.min.css'
import '@/vendors/SliderCaptcha/longbow.slidercaptcha.min.js'
import { onMounted } from 'vue'

const emit = defineEmits([EMITS_CLOSE, EMITS_SUCCESS])

/**
 * 使用人类行为验证
 * 1. 创建 captcha 实例
 */
let captcha = null
onMounted(() => {
  captcha = sliderCaptcha({
    // 渲染位置
    id: 'captcha',
    failedText: '请再试一次',
    barText: '请向右滑动填充拼图',
    // 用户拼图成功之后的回调
    onSuccess(arr) {
      // 这里没有轨迹接口, 就判断数组长度吧
      console.log(arr)
      if (arr.length > 20) {
        emit(EMITS_SUCCESS)
      }
      return arr.length > 20
    },
    // 用户拼图失败的回调
    onFail() {
      console.log('拼图拖动失败')
    },
    // 默认的验证方法
    verify() {
      return true
    }
  })
  console.log(captcha)
})

// 重置
const onReset = () => {
  captcha.reset()
}
// 关闭
const onClose = () => {
  emit(EMITS_CLOSE)
}
</script>

<template>
  <div
    class="fixed top-[20%] left-[50%] translate-x-[-50%] w-[340px] h-[270px] text-sm bg-white dark:bg-zinc-800 rounded border border-zinc-200 dark:border-zinc-900 shadow-3xl"
  >
    <div class="flex items-center h-5 text-left px-1 mb-1">
      <span class="flex-grow dark:text-zinc-200">请完成安全验证</span>
      <SvgIcon
        name="refresh"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onReset"
      ></SvgIcon>
      <SvgIcon
        name="close"
        fillClass="fill-zinc-900 dark:fill-zinc-200"
        class="ml-2 w-3 h-3 p-0.5 rounded-sm duration-300 cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-900"
        @click="onClose"
      ></SvgIcon>
    </div>
    <div id="captcha"></div>
  </div>
</template>

<style scoped lang="scss"></style>
