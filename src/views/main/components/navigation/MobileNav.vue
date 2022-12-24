<script setup>
import { onBeforeUpdate, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import SvgIcon from '@/libs/SvgIcon.vue'
import PopUp from '@/libs/PopUp.vue'
import MenuView from '../menu/MenuView.vue'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()

// 滑块样式
const sliderStyle = ref({
  transform: 'translateX(0px)',
  width: '52px'
})

// navigation 选中的下标
const currentCategoryIndex = ref(0)

// 获取所有的 item 元素
let itemRefs = []
const setItemRef = (el) => el && itemRefs.push(el)
onBeforeUpdate(() => {
  itemRefs = []
})

const ulTarget = ref()
const { x: ulScrollLeft } = useScroll(ulTarget)
watch(currentCategoryIndex, (val) => {
  const { left, width } = itemRefs[val].getBoundingClientRect()
  sliderStyle.value = {
    transform: `translateX(${ulScrollLeft.value + left - 10}px)`,
    width: width + 'px'
  }
})

const onItemClick = (index) => {
  currentCategoryIndex.value = index
}

// popup 是否显式
const isPopUpShow = ref(false)

const handlePopUpShow = () => {
  isPopUpShow.value = true
}

const onHandleMenuClickItem = (index) => {
  currentCategoryIndex.value = index
  isPopUpShow.value = false
}
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10 duration-500">
    <ul ref="ulTarget" class="relative flex overflow-x-auto p-1 text-xs text-zinc-600">
      <!-- 滑块 -->
      <li
        ref="sliderTarget"
        :style="sliderStyle"
        class="absolute h-[22px] bg-zinc-900 rounded-lg duration-200 dark:bg-zinc-800"
      ></li>
      <!-- 汉堡按钮 -->
      <li
        @click="handlePopUpShow"
        class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white dark:bg-zinc-900 dark:shadow-l-zinc"
      >
        <svg-icon name="hamburger" class="w-1.5 h-1.5"></svg-icon>
      </li>
      <li
        v-for="(item, index) in categoryStore.categoryList"
        :key="item.id"
        :ref="setItemRef"
        @click="onItemClick(index)"
        :class="{ 'text-zinc-100': currentCategoryIndex === index }"
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-2"
      >
        {{ item.name }}
      </li>
    </ul>
  </div>
  <pop-up v-model="isPopUpShow">
    <menu-view @onHandleMenuClickItem="onHandleMenuClickItem" />
  </pop-up>
</template>

<style scoped lang="scss"></style>
