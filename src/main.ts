import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'

import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'

import { router } from './router'
import './style.css'
import App from './App.vue'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app')
