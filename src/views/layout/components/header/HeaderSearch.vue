<script setup>
import SearchBar from '@/libs/SearchBar.vue'
import { ref } from 'vue'

const inputValue = ref('')
</script>

<template>
  <div class="w-full">
    <SearchBar v-model="inputValue">
      <template #dropdown>
        <div>啥是</div>
      </template>
    </SearchBar>
  </div>
</template>

<style scoped lang="scss"></style>
