import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => {
    return {
      historys: []
    }
  },
  actions: {
    /**
     * 新增
     * 1. 新增的记录位于头部
     * 2. 不可出现重复的记录
     */
    addHistory(newHistory) {
      const targetIndex = this.historys.findIndex((item) => item === newHistory)
      if (targetIndex !== -1) {
        this.historys.splice(targetIndex, 1)
      }
      this.historys.unshift(newHistory)
    },
    // 单个删除
    deleteHistory(index) {
      this.historys.splice(index, 1)
    },
    // 全部删除
    deleteAllHistory() {
      this.historys = []
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'search',
        storage: localStorage
      }
    ]
  }
})
