<script setup>
import HeaderView from './components/header/HeaderView.vue'
import MainView from './components/MainView.vue'
import FloatingView from './components/FloatingView.vue'
</script>

<template>
  <div class="h-screen">
    <header-view class="h-header"></header-view>
    <div class="h-main">
      <main-view></main-view>
    </div>
    <floating-view></floating-view>
  </div>
</template>

<style scoped lang="scss"></style>
