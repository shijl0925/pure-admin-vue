import type { Plugin } from 'vite'

import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

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
      // read source file
      const sourceFile = ts.createSourceFile(
        sourcePath,
        fs.readFileSync(sourcePath, 'utf-8'),
        ts.ScriptTarget.Latest,
        true,
      )

      let typeContent = `${generateTypeFileHeader(pluginName)}
declare interface I18nMessages {
`

      // recursive processing object structure
      function processNode(node: ts.Node, prefix: string = '') {
        if (ts.isObjectLiteralExpression(node)) {
          node.properties.forEach((prop) => {
            if (ts.isPropertyAssignment(prop)) {
              const propName = prop.name.getText(sourceFile)

              if (ts.isObjectLiteralExpression(prop.initializer)) {
                typeContent += `${prefix}${propName}: {\n`
                processNode(prop.initializer, `${prefix}  `)
                typeContent += `${prefix}}\n`
              }
              else if (ts.isStringLiteral(prop.initializer)) {
                typeContent += `${prefix}${propName}: string;\n`
              }
            }
          })
        }
      }

      // find the default exported object
      sourceFile.statements.forEach((node) => {
        if (ts.isExportAssignment(node) && node.expression) {
          processNode(node.expression, '  ')
        }
      })

      typeContent += '}\n'

      typeContent += `
declare interface I18n {
  message: I18nMessages
}\n`

      // ensure the output directory exists
      const outputDir = path.dirname(outputPath)
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true })
      }

      // write type file
      fs.writeFileSync(outputPath, typeContent)
      console.log('✨ I18n type definitions generated successfully!')
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
