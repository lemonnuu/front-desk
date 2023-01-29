import { defineStore } from 'pinia'
import md5 from 'md5'
import { loginUser } from '../api/sys'
import { message } from '../libs'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    avatar: ''
  }),
  actions: {
    setToken(token) {
      this.token = token
    },
    setAvatar(avatar) {
      this.avatar = avatar
    },
    async login(payload) {
      const { password } = payload
      const data = await loginUser({
        ...payload,
        password: password ? md5(password) : ''
      }).catch((err) => {
        console.log(err)
        message('error', err.response.data, 2000)
      })
      if (!data) return false
      this.setToken(data.token)
      this.setAvatar(data.image)
      message('success', `欢迎您, 亲爱的 ${data.username}`, 4000)
      return data
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: sessionStorage
      }
    ]
  }
})
