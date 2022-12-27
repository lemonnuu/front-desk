<script setup>
import SearchBar from '@/libs/SearchBar.vue'
import { ref } from 'vue'
import SearchHint from './SearchHint.vue'
import SearchHistory from './SearchHistory.vue'
import { useSearchStore } from '../../../../stores/search'
import { useSearchTextStore } from '../../../../stores/searchText'
import SearchTheme from './SearchTheme.vue'

const searchStore = useSearchStore()
const searchTextStore = useSearchTextStore()
const inputValue = ref('')

/**
 * 搜索回调
 */
const onHandleSearch = (item) => {
  inputValue.value = item
  if (item) {
    searchStore.addHistory(item)
  }
  searchTextStore.changeSearchText(item)
}
</script>

<template>
  <div class="w-full guide-search">
    <SearchBar v-model="inputValue" @search="onHandleSearch">
      <template #dropdown>
        <div>
          <!-- 搜索提示 -->
          <SearchHint
            :search-text="inputValue"
            v-show="inputValue"
            @onClickItem="onHandleSearch"
          ></SearchHint>
          <!-- 最近搜索 -->
          <SearchHistory v-show="!inputValue" @onClickItem="onHandleSearch"></SearchHistory>
          <!-- 推荐主题 -->
          <SearchTheme v-show="!inputValue"></SearchTheme>
        </div>
      </template>
    </SearchBar>
  </div>
</template>

<style scoped lang="scss"></style>
