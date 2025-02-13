import iconParkOutline from '@iconify-json/icon-park-outline/icons.json'
import { addCollection } from '@iconify/vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import 'virtual:local-icons'

import { i18n } from '@/locales'

import App from './App.vue'
import { router } from './router'

addCollection(iconParkOutline)
const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(router)
  .use(Antd)
  .use(i18n)
  .mount('#app')
