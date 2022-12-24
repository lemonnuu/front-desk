import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCategory } from '@/api/category'
import { ALL_CATEGORY_ITEM } from '@/constants'

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([])
  const getCategoryList = async () => {
    const { category } = await getCategory()
    categoryList.value = category
    categoryList.value.unshift(ALL_CATEGORY_ITEM)
  }
  return {
    categoryList,
    getCategoryList
  }
})
