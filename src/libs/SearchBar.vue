<script>
/**
 * 1. 输入内容实现双向绑定
 * 2. 搜索按钮在 hover 时展示
 * 3. 一键清空文本功能
 * 4. 触发搜索
 * 5. 控制下拉区的展示
 * 6. 事件处理
 */

const EMIT_UPDATE_MODELVALUE = 'update:modelValue' // 双向绑定
const EMIT_SEARCH = 'search' // search 搜索
const EMIT_CLEAR = 'clear' // 删除所有文本
const EMIT_INPUT = 'input' // 输入事件
const EMIT_FOCUS = 'focus' // 获取焦点事件
const EMIT_BLUR = 'blur' // 失去焦点事件
</script>

<script setup>
import ComBtn from './ComBtn.vue'
import { ref, watch } from 'vue'
import { useVModel, onClickOutside } from '@vueuse/core'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  }
})
const emit = defineEmits([
  EMIT_UPDATE_MODELVALUE,
  EMIT_SEARCH,
  EMIT_CLEAR,
  EMIT_INPUT,
  EMIT_FOCUS,
  EMIT_BLUR
])
const inputValue = useVModel(props, 'modelValue', emit)
// 监听用户输入行为
watch(inputValue, (val) => {
  emit(EMIT_INPUT, val)
})

// 删除文本
const onClickClear = () => {
  inputValue.value = ''
  emit(EMIT_CLEAR, '')
}

// 触发搜索
const onHandleSearch = () => {
  emit(EMIT_SEARCH, inputValue.value)
}

// input 是否获取到焦点
const isFocus = ref(false)
const onHandleFocus = () => {
  isFocus.value = true
  emit(EMIT_FOCUS)
}

const onHandleBlur = () => {
  emit(EMIT_BLUR)
}

const searchContainer = ref(null)
onClickOutside(searchContainer, () => {
  isFocus.value = false
})
</script>

<template>
  <div
    ref="searchContainer"
    class="group relative p-0.5 rounded-xl border-white duration-500 hover:bg-red-100/40"
  >
    <div>
      <svg-icon
        class="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2"
        name="search"
        color="#707070"
      ></svg-icon>
      <!-- 输入框 -->
      <input
        class="block w-full h-[44px] pl-4 outline-0 bg-zinc-100 caret-zinc-400 rounded-xl text-zinc-900 tracking-wide text-sm font-semibold border border-zinc-100 focus:border-red-300 group-hover:bg-white group-hover:border-zinc-200"
        type="text"
        v-model="inputValue"
        @keyup.enter="onHandleSearch"
        @focus="onHandleFocus"
        @blur="onHandleBlur"
      />
      <!-- 删除按钮 -->
      <svg-icon
        v-show="inputValue"
        @click="onClickClear"
        name="input-delete"
        class="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
      ></svg-icon>
      <!-- 分割线 -->
      <div
        class="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"
      ></div>
      <!-- TODO: 搜索按钮 -->
      <com-btn
        icon="search"
        icon-color="#ffffff"
        @click="onHandleSearch"
        class="absolute translate-y-[-50%] top-[50%] right-1 rounded-full opacity-0 duration-1000 group-hover:opacity-100"
      ></com-btn>
    </div>
    <!-- 下拉区 -->
    <Transition name="slide">
      <div
        v-if="$slots.dropdown"
        v-show="isFocus"
        class="max-h-[368px] w-full text-base overflow-auto bg-white dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-3xl scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent"
      >
        <slot name="dropdown"></slot>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(40px);
}
</style>
