import { VueQueryPlugin } from '@tanstack/vue-query'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import 'virtual:local-icons'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { createApp } from 'vue'

import { i18n } from '@/locales'
import { setupIconifyOffline, setupLoading } from '@/plugins'

import App from './App.vue'
import { router } from './router'

setupLoading()
setupIconifyOffline()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

createApp(App)
  .use(pinia)
  .use(router)
  .use(Antd)
  .use(i18n)
  .use(VueQueryPlugin)
  .mount('#app')
