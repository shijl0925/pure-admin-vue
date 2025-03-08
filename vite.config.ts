import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'

import { setPermissionMeta } from './src/router/routeMeta'
import { svgToIconify } from './vite-plugins'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const { VITE_PORT, VITE_BASE_URL } = env
  return {
    base: VITE_BASE_URL,
    server: {
      port: Number.parseInt(VITE_PORT),
    },
    plugins: [
      VueRouter({
        dts: fileURLToPath(new URL('./types/typed-router.d.ts', import.meta.url)),
        exclude: ['**/component{,s}/**'],
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
      VueI18nPlugin({
        include: resolve(dirname(fileURLToPath(import.meta.url)), './src/locales/langs/**'),
        // include: resolve(__dirname, './src/locales/langs/**'),
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
