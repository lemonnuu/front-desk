<script setup>
import PopOver from '@/libs/PopOver.vue'
import SvgIcon from '../../../../libs/SvgIcon.vue'

import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { useThemeStore } from '../../../../stores/theme'
import { computed } from 'vue'

const themeArr = [
  {
    id: 0,
    type: THEME_LIGHT,
    icon: 'theme-light',
    name: '极简白'
  },
  {
    id: 1,
    type: THEME_DARK,
    icon: 'theme-dark',
    name: '极简黑'
  },
  {
    id: 2,
    type: THEME_SYSTEM,
    icon: 'theme-system',
    name: '跟随系统'
  }
]

/**
 * 1. 监听主题的切换行为
 * 2. 根据行为保存当前需要展示的主题到 pinia
 * 3. 根据 pinia 中保存的当前主题, 展示 header-theme 下的显式图标
 * 4. 根据 pinia 中保存的当前主题, 修改 html 的 class
 */
const themeStore = useThemeStore()
const onHandleClickThemeItem = (themeType) => themeStore.changeTheme(themeType)
// 根据主题展示图标
const svgThemeIconName = computed(() => {
  return themeArr.find((item) => item.type === themeStore.themeType).icon
})
</script>

<template>
  <pop-over placement="bottom-left">
    <!-- 具名插槽：触发弹层的视图 -->
    <template #reference>
      <svg-icon
        :name="svgThemeIconName"
        class="w-2 h-2 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
        fill-class="fill-zinc-900 dark:fill-zinc-300"
      ></svg-icon>
    </template>
    <!-- 匿名插槽：弹出层视图中展示的内容 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in themeArr"
        :key="item.id"
        @click="onHandleClickThemeItem(item.type)"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <svg-icon
          :name="item.icon"
          class="w-1.5 h-1.5 mr-1"
          fill-class="fill-zinc-900 dark:fill-zinc-300"
        ></svg-icon>
        <span class="text-zinc-900 text-sm dark:text-zinc-300">{{ item.name }}</span>
      </div>
    </div>
  </pop-over>
</template>

<style scoped lang="scss"></style>
