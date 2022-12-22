<script setup>
import SvgIcon from '../../../../libs/SvgIcon.vue';

const props = defineProps({
  categoryList: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="bg-white sticky top-0 left-0 z-10">
    <ul class="relative flex overflow-x-auto p-1 text-xs text-zinc-600">
      <!-- 汉堡图标 -->
      <li class="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white z-20 shadow-l-white">
        <svg-icon name="hamburger" class="w-1.5 h-1.5"></svg-icon>
      </li>
      <li 
        v-for="item in categoryList" :key="item.id" 
        class="shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-2">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss"></style>
