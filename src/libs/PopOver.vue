<script>
/**
 * 1. 指定所有可选位置的常量, 并生成 enum
 * 2. 通过 prop 控制指定位置
 * 3. 获取元素的 DOM, 创建读取元素尺寸的方法
 * 4. 生成气泡的样式对象, 用来控制每个位置对应的样式
 * 5. 根据 prop, 计算样式对象
 */
const PROP_TOP_LEFT = 'top-left' // 左上
const PROP_TOP_RIGHT = 'top-right' // 右上
const PROP_BOTTOM_LEFT = 'bottom-left' // 左下
const PROP_BOTTOM_RIGHT = 'bottom-right' // 右下
const placementEnum = [PROP_TOP_LEFT, PROP_TOP_RIGHT, PROP_BOTTOM_LEFT, PROP_BOTTOM_RIGHT]
const DELAY_TIME = 200
</script>

<script setup>
import { nextTick, ref, watch, useSlots } from 'vue'

const slots = useSlots()

const props = defineProps({
  placement: {
    type: String,
    default: PROP_BOTTOM_LEFT,
    validator(val) {
      const result = placementEnum.includes(val)
      if (!result) {
        throw new Error(`你的 placement 必须是${placementEnum.join('、')}中的一个`)
      }
      return result
    }
  }
})

const isVisable = ref(false)
// 鼠标移入触发
let timeout = null
const onHandleMouseEnter = () => {
  if (!slots.default) return
  isVisable.value = true
  if (timeout) {
    clearTimeout(timeout)
  }
}
// 鼠标移出触发
const onHandleMouseLeave = () => {
  timeout = setTimeout(() => {
    isVisable.value = false
  }, DELAY_TIME)
}
// 计算元素的尺寸
const referenceTarget = ref(null)
const contentTarget = ref(null)
const useElementSize = (target) => {
  if (!target) return
  return {
    width: target.offsetWidth,
    height: target.offsetHeight
  }
}
// 气泡样式
const contentStyle = ref({
  top: 0,
  left: 0
})

// 计算：期望气泡展示的时候再进行计算
watch(isVisable, (val) => {
  if (!val) return
  nextTick(() => {
    switch (props.placement) {
      case PROP_TOP_LEFT:
        contentStyle.value.top = 0
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_TOP_RIGHT:
        contentStyle.value.top = 0
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
      case PROP_BOTTOM_LEFT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = -useElementSize(contentTarget.value).width + 'px'
        break
      case PROP_BOTTOM_RIGHT:
        contentStyle.value.top = useElementSize(referenceTarget.value).height + 'px'
        contentStyle.value.left = useElementSize(referenceTarget.value).width + 'px'
        break
      default:
        break
    }
  })
})
</script>

<template>
  <div class="relative" @mouseenter="onHandleMouseEnter" @mouseleave="onHandleMouseLeave">
    <div ref="referenceTarget">
      <!-- 具名插槽：触发弹层的视图 -->
      <slot name="reference"></slot>
    </div>
    <!-- 气泡展示 -->
    <Transition name="slide">
      <div
        v-if="slots.default"
        ref="contentTarget"
        v-show="isVisable"
        class="absolute p-1 z-20 bg-white dark:bg-zinc-900 border rounded-md dark:border-zinc-700"
        :style="contentStyle"
      >
        <!-- 匿名插槽：弹出层视图中展示的内容 -->
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
}
</style>
