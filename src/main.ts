import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'virtual:uno.css'
import 'ant-design-vue/dist/reset.css'

import App from './App.vue'
import { router } from './router'

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app')
