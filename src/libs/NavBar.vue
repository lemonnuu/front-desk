<script setup>
import { useRouter } from 'vue-router'
import SvgIcon from './SvgIcon.vue'

const router = useRouter()

const props = defineProps({
  // 左边按钮点击事件
  clickLeft: {
    type: Function
  },
  // 右边按钮点击事件
  clickRight: {
    type: Function
  },
  // 是否吸顶
  sticky: {
    type: Boolean
  }
})

// 左侧按钮点击事件
const onClickLeft = () => {
  if (props.clickLeft) {
    return props.clickLeft()
  }
  router.back()
}

// 右侧按钮点击事件
const onClickRight = () => {
  if (props.clickRight) {
    return props.clickRight()
  }
}
</script>

<template>
  <div
    class="w-full h-5 border-b flex items-center z-10 bg-white dark:bg-zinc-800 border-b-zinc-200 dark:border-b-zinc-700"
    :class="[sticky ? 'sticky top-0 left-0' : 'relative']"
  >
    <!-- 左 -->
    <div class="h-full w-5 absolute left-0 flex items-center justify-center" @click="onClickLeft">
      <slot name="left">
        <SvgIcon name="back" class="w-2 h-2" fillClass="fill-zinc-900 dark:fill-zinc-200"></SvgIcon>
      </slot>
    </div>
    <!-- 中 -->
    <div
      class="h-full flex items-center justify-center m-auto font-bold text-base text-zinc-900 dark:text-zinc-200"
    >
      <slot></slot>
    </div>
    <!-- 右 -->
    <div class="h-full w-5 absolute right-0 flex items-center justify-center" @click="onClickRight">
      <slot name="right" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
