import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import UnoCSS from 'unocss/vite'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'

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
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8888',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue': ['vue', 'vue-router', 'pinia'],
            'ant-design-vue': ['ant-design-vue'],
            'echarts': ['echarts'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        },
      },
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
      viteCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用
        threshold: 1024, // 体积大于阈值会被压缩，单位为 b，默认为 1kb
        algorithm: 'gzip', // 压缩算法，可选 ['gzip','brotliCompress','deflate','deflateRaw']
        ext: '.gz', // 生成的压缩包后缀
        deleteOriginFile: false, // 是否删除原文件，默认为 false
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
