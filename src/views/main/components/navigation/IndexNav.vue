<script setup>
import { ref } from 'vue'
import MobileNav from './MobileNav.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

const categoryList = ref([])
const getAllCategory = async () => {
  const { category } = await getCategory()
  categoryList.value = category
  categoryList.value.unshift(ALL_CATEGORY_ITEM)
}
getAllCategory()
</script>

<template>
  <MobileNav v-if="isMobileTerminal" :categoryList="categoryList"></MobileNav>
</template>

<style scoped lang="scss"></style>
