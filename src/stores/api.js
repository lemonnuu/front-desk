import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { ALL_CATEGORY_ITEM } from '../constants'
import { useCategoryStore } from './category'

export const useApiStore = defineStore('api', () => {
  const categoryStore = useCategoryStore()
  const currentCategory = ref(ALL_CATEGORY_ITEM)
  const currentCategoryIndex = computed(() => {
    return categoryStore.categoryList.findIndex((item) => item.id === currentCategory.value.id)
  })
  const changeCurrentCategory = (category) => {
    currentCategory.value = category
  }
  return {
    currentCategory,
    currentCategoryIndex,
    changeCurrentCategory
  }
})
