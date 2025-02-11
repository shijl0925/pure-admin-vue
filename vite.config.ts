import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

import { i18nTypeGenerator, svgToIconify } from './vite-plugins'

const resolvePath = (path: string) => resolve(__dirname, path)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      routeBlockLang: 'yaml',
      dts: resolvePath('./types/typed-router.d.ts'),
    }),
    vue(),
    UnoCSS(),
    svgToIconify({
      dts: resolvePath('./types/virtual-local-icons.d.ts'),
    }),
    i18nTypeGenerator({
      localeFile: resolvePath('./src/locales/en-US.ts'),
      dts: resolvePath('./types/i18n.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
