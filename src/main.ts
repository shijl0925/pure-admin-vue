import iconParkOutline from '@iconify-json/icon-park-outline/icons.json'
import { addCollection } from '@iconify/vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import 'virtual:uno.css'
import 'virtual:local-icons'
import 'ant-design-vue/dist/reset.css'
import { createApp } from 'vue'

import App from './App.vue'
import { router } from './router'

addCollection(iconParkOutline)

const pinia = createPinia()

createApp(App)
  .use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app')
