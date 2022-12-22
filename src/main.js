import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './styles/index.css'

import {useREM} from './utils/flexible'
import libs from './libs'
import 'virtual:svg-icons-register'

useREM()

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(libs)

app.mount('#app')
