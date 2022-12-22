<script setup>
import {ref} from 'vue'
import MobileNav from './MobileNav.vue'
import { isMobileTerminal } from '@/utils/flexible'
import { getCategory } from '@/api/category'

const categoryList = ref([])
const getAllCategory = async () => {
  const {category} = await getCategory()
  categoryList.value = category
}
getAllCategory()
</script>

<template>
  <MobileNav v-if="isMobileTerminal" :categoryList="categoryList"></MobileNav>
</template>

<style scoped lang="scss"></style>
