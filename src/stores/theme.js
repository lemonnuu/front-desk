import { defineStore } from 'pinia'
import { THEME_LIGHT } from '@/constants'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    themeType: THEME_LIGHT
  }),
  actions: {
    changeTheme(themeType) {
      this.themeType = themeType
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'theme',
        storage: sessionStorage
      }
    ]
  }
})
