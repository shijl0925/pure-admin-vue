import type { Plugin } from 'vite'

import fs from 'node:fs'
import path from 'node:path'

import { generateTypeFileHeader } from './helper'

export interface I18nTypeGeneratorOptions {
  // source locale file path
  localeFile?: string
  // output type file path
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
      // make sure the source file exists
      if (!fs.existsSync(sourcePath)) {
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
      // ensure the output directory exists
      const outputDir = path.dirname(outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // write type file
      fs.writeFileSync(outputPath, typeContent)
    }
    catch (error) {
      console.error('Error generating i18n types:', error)
    }
  }

  return {
    name: pluginName,

    configureServer(server) {
      if (!isWatching) {
        // watch file changes
        server.watcher.add(path.resolve(localeFile))
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
