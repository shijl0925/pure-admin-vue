import type { Plugin } from 'vite'

import { cleanupSVG, importDirectory, isEmptyColor, parseColors, runSVGO } from '@iconify/tools'
import fs from 'node:fs'
import path from 'node:path'

import { generateTypeFileHeader } from './helper'

export default function svgToIconify(
  {
    options = {
      svgDir: 'src/assets/svg-icon',
      prefix: 'icon-local',
    },
    dts = 'virtual-local-icons.d.ts',
  },
): Plugin {
  const virtualModuleId = 'virtual:local-icons'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  const pluginName = 'vite-plugin-svg-to-iconify'
  let lastUpdated: number | null = null

  return {
    name: pluginName,

    // configureServer(server) {
    //   // 监听 SVG 文件变化
    //   server.watcher.add(path.resolve(process.cwd(), options.svgDir))
    //   server.watcher.on('change', (file) => {
    //     if (file.endsWith('.svg')) {
    //       // 通知客户端重新加载
    //       server.ws.send({
    //         type: 'full-reload',
    //       })
    //     }
    //   })
    // },

    configureServer(server) {
      server.watcher.add(path.resolve(process.cwd(), options.svgDir))
      server.watcher.on('change', async (file) => {
        if (file.endsWith('.svg')) {
          // 获取更新时间戳
          const stats = fs.statSync(file)
          const updated = stats.mtimeMs

          // 避免重复触发更新
          if (updated !== lastUpdated) {
            lastUpdated = updated

            // 手动触发模块更新
            const module = server.moduleGraph.getModuleById(resolvedVirtualModuleId)
            if (module) {
              server.moduleGraph.invalidateModule(module)
              server.ws.send({
                type: 'update',
                updates: [
                  {
                    type: 'js-update',
                    path: resolvedVirtualModuleId,
                    acceptedPath: resolvedVirtualModuleId,
                    timestamp: updated,
                  },
                ],
              })
            }
          }
        }
      })
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    configResolved(config) {
      // 确保类型声明文件目录存在
      const typesDir = path.resolve(config.root, 'types')
      if (!fs.existsSync(typesDir)) {
        fs.mkdirSync(typesDir, { recursive: true })
      }

      // 生成类型声明文件
      const dtsContent = `${generateTypeFileHeader(pluginName)}
declare module 'virtual:local-icons' {
  export const icons: string[]
}`

      fs.writeFileSync(
        dts,
        dtsContent,
      )
    },

    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const svgDir = path.resolve(process.cwd(), options.svgDir)

        // 读取所有 SVG 文件
        const iconSet = await importDirectory(svgDir, {
          prefix: options.prefix,
        })
        iconSet.forEach((name, type) => {
          if (type !== 'icon') {
            return
          }

          const svg = iconSet.toSVG(name)
          if (!svg) {
            // Invalid icon
            iconSet.remove(name)
            return
          }
          // Clean up and optimise icons
          try {
            // Clean up icon code
            cleanupSVG(svg)

            // Assume icon is monotone: replace color with currentColor, add if missing
            // If icon is not monotone, remove this code
            parseColors(svg, {
              defaultColor: 'currentColor',
              callback: (_attr, colorStr, color) => {
                return !color || isEmptyColor(color)
                  ? colorStr
                  : 'currentColor'
              },
            })

            // Optimise
            runSVGO(svg)
          }
          catch (err) {
            // Invalid icon
            console.error(`Error parsing ${name}:`, err)
            iconSet.remove(name)
            return
          }

          // Update icon
          iconSet.fromSVG(name, svg)
        })

        // 导出图标数据
        const exported = iconSet.export()

        const localIconSet = {
          ...exported,
          prefix: options.prefix,
        }

        // 生成虚拟模块代码
        return `
import { addCollection } from '@iconify/vue'

const iconSet = ${JSON.stringify(localIconSet)}
addCollection(iconSet)

// 导出图标列表供类型提示使用
export const icons = ${JSON.stringify(Object.keys(localIconSet.icons).map(name => `${options.prefix}:${name}`))}
`
      }
    },
  }
}
