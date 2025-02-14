import type { Plugin } from 'vite'

import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'

import { generateTypeFileHeader } from './helper'

export interface I18nTypeGeneratorOptions {
  // 源语言文件路径
  localeFile?: string
  // 输出类型文件路径
  dts?: string
}

export default function i18nTypeGenerator(options: I18nTypeGeneratorOptions = {}): Plugin {
  const {
    localeFile = 'src/locales/langs/en-US.ts',
    dts = 'types/i18n.d.ts',
  } = options

  const pluginName = 'vite-plugin-i18n-type-generator'

  let isWatching = false

  function generateTypes(sourcePath: string, outputPath: string) {
    try {
      // 确保源文件存在
      if (!existsSync(sourcePath)) {
        console.error(`Source file ${sourcePath} does not exist.`)
        return
      }

      const typeContent = `${generateTypeFileHeader(pluginName)}
import locale from '${localeFile}'

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends I18nMessages {}
}

export type I18nMessages = typeof locale
`
      // 确保输出目录存在
      const outputDir = path.dirname(outputPath)
      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true })
      }

      // 写入类型文件
      writeFileSync(outputPath, typeContent)
    }
    catch (error) {
      console.error('Error generating i18n types:', error)
    }
  }

  return {
    name: pluginName,

    configureServer(server) {
      if (!isWatching) {
        // 监听文件变化
        server.watcher.add(localeFile)
        server.watcher.on('change', (changedPath) => {
          if (changedPath.includes(localeFile)) {
            generateTypes(localeFile, dts)
          }
        })
        isWatching = true
      }
    },

    buildStart() {
      generateTypes(localeFile, dts)
    },
  }
}
