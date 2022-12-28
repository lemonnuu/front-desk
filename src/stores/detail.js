import { defineStore } from 'pinia'

// 由于没有接口, 点击详情的数据存入 store 中
export const useDetailStore = defineStore('detail', {
  state: () => ({
    lastDetail: {
      id: '123456',
      photo: 'http://img.touxiangwu.com/zb_users/upload/2022/12/202212211671618430729843.jpg',
      title: '默认图片',
      author: '洋子',
      avatar: 'http://img.touxiangwu.com/zb_users/upload/2022/12/202212211671618430729843.jpg',
      photoWidth: 390,
      photoHeight: 390
    }
  }),
  actions: {
    changeLastDetail(newLastDetail) {
      this.lastDetail = newLastDetail
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'lastDetail',
        storage: localStorage
      }
    ]
  }
})
