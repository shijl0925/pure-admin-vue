import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

import viteSvgToIconify from './vite-plugins/svg-to-iconify'

const resolvePath = (path: string) => resolve(__dirname, path)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      dts: resolvePath('./types/typed-router.d.ts'),
    }),
    vue(),
    UnoCSS(),
    viteSvgToIconify({
      dts: resolvePath('./types/virtual-local-icons.d.ts'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
