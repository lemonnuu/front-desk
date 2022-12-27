import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchTextStore = defineStore('searchText', () => {
  const searchText = ref('')
  const changeSearchText = (newSearchText) => {
    searchText.value = newSearchText
  }
  return {
    searchText,
    changeSearchText
  }
})
