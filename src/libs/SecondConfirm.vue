<script setup>
import { onMounted, ref } from 'vue'
import ComBtn from './ComBtn.vue'

const props = defineProps({
  // 标题
  title: {
    type: String
  },
  // 描述
  content: {
    type: String,
    required: true
  },
  // 取消按钮文本
  cancelText: {
    type: String,
    default: '取消'
  },
  // 确定按钮文本
  confirmText: {
    type: String,
    default: '确定'
  },
  // 取消按钮事件
  cancelHandle: {
    type: Function
  },
  // 确定按钮事件
  confirmHandle: {
    type: Function
  },
  // 关闭 confirm 的回调
  close: {
    type: Function
  }
})

const isVisable = ref(false)
const show = () => {
  isVisable.value = true
}

/**
 * 处理动画 (render 函数的渲染, 会直接进行)
 */
onMounted(() => {
  show()
})

// 关闭动画执行时间
const duration = '0.5s'

// 关闭事件
const close = () => {
  isVisable.value = false
  // 延迟一段时间进行关闭, 给动画一点时间
  setTimeout(() => {
    if (props.close) {
      props.close()
    }
  }, parseInt(duration.replace('0.', '').replace('s', '') * 100))
}

// 取消按钮事件
const onCancelClick = () => {
  if (props.cancelHandle) {
    props.cancelHandle()
  }
  close()
}

// 确定按钮事件
const onConfirmClick = () => {
  if (props.confirmHandle) {
    props.confirmHandle()
  }
  close()
}
</script>

<template>
  <div>
    <!-- 蒙版 -->
    <Transition name="mask">
      <div
        v-if="isVisable"
        @click="close"
        class="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
      ></div>
    </Transition>
    <!-- 内容 -->
    <Transition name="up">
      <div
        v-if="isVisable"
        class="w-[80%] fixed top-1/3 left-[50%] translate-x-[-50%] z-50 px-2 py-1.5 rounded-sm border dark:border-zinc-600 cursor-pointer bg-white dark:bg-zinc-800 xl:w-[35%]"
      >
        <!-- 标题 -->
        <div class="text-lg font-bold text-zinc-900 dark:text-zinc-200 mb-2">
          {{ title }}
        </div>
        <!-- 文本 -->
        <div class="text-base text-zinc-900 dark:text-zinc-200 mb-2">
          {{ content }}
        </div>
        <!-- 按钮 -->
        <div class="flex justify-end">
          <ComBtn type="info" class="mr-2" @click="onCancelClick">{{ cancelText }}</ComBtn>
          <ComBtn type="primary" @click="onConfirmClick">{{ confirmText }}</ComBtn>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.mask-enter-active,
.mask-leave-active {
  transition: all v-bind(duration);
}

.mask-enter-from,
.mask-leave-to {
  opacity: 0;
}

.up-enter-active,
.up-leave-active {
  transition: all v-bind(duration);
}

.up-enter-from,
.up-leave-to {
  opacity: 0;
  transform: translate3d(-50%, 100px, 0);
}
</style>
