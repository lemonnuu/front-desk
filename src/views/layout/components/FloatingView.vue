<script setup>
import SvgIcon from '../../../libs/SvgIcon.vue'
import PopOver from '../../../libs/PopOver.vue'
import Driver from 'driver.js'
import 'driver.js/dist/driver.min.css'
import { onMounted } from 'vue'
import steps from '../../../utils/step'

// 初始化 Driver, 引导页用的
let driver = null
onMounted(() => {
  driver = new Driver({
    allowClose: false,
    closeBtnText: '关闭',
    nextBtnText: '下一步',
    prevBtnText: '上一步',
    doneBtnText: '我知道了'
  })
})

/**
 * 开始引导
 */
const onHandleGuideClick = () => {
  // 指定步骤
  driver.defineSteps(steps)
  // 开始
  driver.start()
}

const onToFeedback = () => {}
</script>

<template>
  <div class="fixed bottom-10 right-2">
    <!-- 引导页 -->
    <div
      @click="onHandleGuideClick"
      class="guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg group"
    >
      <SvgIcon
        name="guide"
        class="w-2 h-2"
        fill-class="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
      ></SvgIcon>
    </div>
    <!-- 反馈 -->
    <PopOver class="flex items-center guide-feedback" placement="top-left">
      <template #reference>
        <div
          class="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 group hover:shadow-lg"
        >
          <SvgIcon
            name="feedback"
            class="w-2 h-2"
            fill-class="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
          ></SvgIcon>
        </div>
      </template>

      <div class="w-[140px] overflow-hidden">
        <div
          class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          @click="onToFeedback"
        >
          <SvgIcon
            name="feedback"
            class="w-1.5 h-1.5 mr-1"
            fillClass="fill-zinc-900 dark:fill-zinc-300"
          ></SvgIcon>
          <span class="text-zinc-800 dark:text-zinc-300 text-sm">立即吐槽</span>
        </div>
      </div>
    </PopOver>
  </div>
</template>

<style scoped lang="scss">
.driver-fix-stacking {
  position: fixed;
  z-index: 100004 !important;
}
</style>
