import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import './styles/index.css'

import { useREM } from './utils/flexible'
import useTheme from './utils/theme'
import libs from './libs'
import 'virtual:svg-icons-register'

useREM()

const app = createApp(App)

app.use(createPinia().use(piniaPersist))
app.use(router)
app.use(libs)

useTheme()

app.mount('#app')
