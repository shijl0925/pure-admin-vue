import iconParkOutline from '@iconify-json/icon-park-outline/icons.json'
import { addCollection } from '@iconify/vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import 'virtual:local-icons'

import { setupI18n } from '@/locales'

import App from './App.vue'
import { router } from './router'

addCollection(iconParkOutline)

const pinia = createPinia()

const app = createApp(App)

setupI18n(app)

app
  .use(router)
  .use(pinia)
  .use(Antd)
  .mount('#app')
