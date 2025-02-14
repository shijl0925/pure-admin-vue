import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

import { setPermissionMeta } from './src/router/permissions'
import { i18nTypeGenerator, svgToIconify } from './vite-plugins'

// https://vite.dev/config/
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routeBlockLang: 'yaml',
      dts: fileURLToPath(new URL('./types/typed-router.d.ts', import.meta.url)),
      async extendRoute(route) {
        setPermissionMeta(route)
      },
    }),
    vue(),
    UnoCSS(),
    svgToIconify({
      svgDir: fileURLToPath(new URL('./src/assets/svg-icon', import.meta.url)),
      prefix: 'icon-local',
      dts: fileURLToPath(new URL('./types/virtual-local-icons.d.ts', import.meta.url)),
    }),
    i18nTypeGenerator({
      localeFile: fileURLToPath(new URL('./src/locales/en-US.ts', import.meta.url)),
      dts: fileURLToPath(new URL('./types/i18n.d.ts', import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
