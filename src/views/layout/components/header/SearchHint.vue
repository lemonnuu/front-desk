<script setup>
import { ref } from 'vue'
import { getSearchHint } from '../../../../api/imgs'
import { watchDebounced } from '@vueuse/core'

const props = defineProps({
  // 搜索文本
  searchText: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['onClickItem'])

/**
 * 处理搜索提示数据获取
 */
const hintData = ref([])
const getHintData = async () => {
  if (!props.searchText || props.searchText.length > 11) return
  const randomCount = Math.floor(Math.random() * 7) + 1
  const res = new Set()
  const maxSize = 11 - props.searchText.length
  if (maxSize) {
    for (let i = 0; i < randomCount; i++) {
      const random = Math.floor(Math.random() * maxSize) + 1
      const suffix = Math.floor(Math.random() * 10 ** random)
      res.add(props.searchText + suffix)
    }
    hintData.value = [...res]
  } else {
    hintData.value = []
  }
}

watchDebounced(() => props.searchText, getHintData, {
  immediate: true,
  debounce: 500
})

/**
 * 点击事件处理
 */
const onHandleItemClick = (item) => {
  emit('onClickItem', item)
}

/**
 * 处理关键字高亮
 */
const highlightText = (text) => {
  // 生成高亮标签
  const highlightStr = `<span class="text-zinc-900 dark:text-zinc-200">${props.searchText}</span>`
  // 正则表达式：从显示文本中找出与用户输入文本相同的内容, 使用高亮标签进行替换
  const regExp = new RegExp(props.searchText, 'gi')
  return text.replace(regExp, highlightStr)
}
</script>

<template>
  <div>
    <div
      v-for="(item, index) in hintData"
      :key="index"
      @click="onHandleItemClick(item)"
      v-html="highlightText(item)"
      class="py-1 pl-1 text-base font-bold text-zinc-500 rounded cursor-pointer duration-300 hover:bg-zinc-200 dark:hover:bg-zinc-900"
    ></div>
  </div>
</template>

<style scoped lang="scss"></style>
