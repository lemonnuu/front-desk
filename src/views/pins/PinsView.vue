<script setup>
import PinsComponent from './components/PinsComponent.vue'
import { useDetailStore } from '../../stores/detail'

const detailStore = useDetailStore()
</script>

<template>
  <div class="w-full h-full bg-zinc-200 dark:bg-zinc-800">
    <PinsComponent :data="detailStore.lastDetail"></PinsComponent>
  </div>
</template>

<style scoped lang="scss"></style>
