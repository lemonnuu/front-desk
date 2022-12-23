<script setup>
import PopOver from '@/libs/PopOver.vue'
import SvgIcon from '../../../../libs/SvgIcon.vue'

import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'

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
</script>

<template>
  <pop-over placement="bottom-left">
    <!-- 具名插槽：触发弹层的视图 -->
    <template #reference>
      <svg-icon
        name="theme-light"
        class="w-2 h-2 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60"
        fill-class="fill-zinc-900"
      ></svg-icon>
    </template>
    <!-- 匿名插槽：弹出层视图中展示的内容 -->
    <div class="w-[140px] overflow-hidden">
      <div
        v-for="item in themeArr"
        :key="item.id"
        class="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60"
      >
        <svg-icon :name="item.icon" class="w-1.5 h-1.5 mr-1" fill-class="fill-zinc-900"></svg-icon>
        <span class="text-zinc-900 text-sm">{{ item.name }}</span>
      </div>
    </div>
  </pop-over>
</template>

<style scoped lang="scss"></style>
