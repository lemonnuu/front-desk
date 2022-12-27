import { fileURLToPath, URL } from 'node:url'
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定 symbolId 格式
      symbolId: 'icon-[name]'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/f4f4ee7dc2f219848cbddc33ac4ea3cb/front-desk',
        changeOrigin: true
      },
      // imgapi 调用接口
      '/imgapi': {
        target: 'https://imgapi.cn',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/imgapi/, '')
      },
      '/likepoems': {
        target: 'https://api.likepoems.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/likepoems/, '')
      },
      '/usuuu': {
        target: 'https://api.usuuu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/usuuu/, '')
      }
    }
  }
})
