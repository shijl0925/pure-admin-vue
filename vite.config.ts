import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'

const resolvePath = (path: string) => resolve(__dirname, path)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VueRouter({
      /* options */
    }),
    vue(),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': resolvePath('./src'),
    },
  },
})
