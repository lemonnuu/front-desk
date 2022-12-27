<script setup>
import ImgList from './components/list/ImgList.vue'
import IndexNav from './components/navigation/IndexNav.vue'
</script>

<template>
  <div
    class="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-200 scrollbar-track-transparent"
  >
    <IndexNav />
    <div class="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
      <ImgList></ImgList>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
