<script setup>
import MobileNav from './MobileNav.vue'
import PCNav from './PCNav.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
categoryStore.getCategoryList()
</script>

<template>
  <MobileNav v-if="isMobileTerminal"></MobileNav>
  <PCNav v-else></PCNav>
</template>

<style scoped lang="scss"></style>
