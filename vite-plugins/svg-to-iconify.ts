import type { Plugin } from 'vite'

import fs from 'node:fs'
import path from 'node:path'
import { parse as parseSvg } from 'svg-parser'

interface IconifyIcon {
  body: string
  width?: number
  height?: number
}

interface IconifyJSON {
  prefix: string
  icons: Record<string, IconifyIcon>
  width?: number
  height?: number
}

interface SvgElement {
  properties: { viewBox?: string, [key: string]: any }
}

export default function viteSvgToIconify(
  {
    options = {
      svgDir: 'src/assets/svg-icon',
      prefix: 'icon-local',
      dts: 'virtual-local-icons.d.ts',
    },
    dts = 'virtual-local-icons.d.ts',
  },
): Plugin {
  let iconifyJSON: IconifyJSON
  const virtualModuleId = 'virtual:local-icons'
  const resolvedVirtualModuleId = `\0${virtualModuleId}`

  return {
    name: 'vite-plugin-svg-to-iconify',

    configureServer(server) {
      // 监听 SVG 文件变化
      server.watcher.add(path.resolve(process.cwd(), options.svgDir))
      server.watcher.on('change', (file) => {
        if (file.endsWith('.svg')) {
          // 通知客户端重新加载
          server.ws.send({
            type: 'full-reload',
          })
        }
      })
    },

    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },

    async load(id) {
      if (id === resolvedVirtualModuleId) {
        const svgDir = path.resolve(process.cwd(), options.svgDir)
        iconifyJSON = {
          prefix: options.prefix,
          icons: {},
          width: 1024,
          height: 1024,
        }

        // 读取所有 SVG 文件
        const svgFiles = fs.readdirSync(svgDir)
          .filter(file => file.endsWith('.svg'))

        // 处理每个 SVG 文件
        svgFiles.forEach((file) => {
          const filePath = path.join(svgDir, file)
          const svgContent = fs.readFileSync(filePath, 'utf-8')
          const iconName = path.basename(file, '.svg')

          try {
            // 解析 SVG
            const ast = parseSvg(svgContent)
            const svgNode = ast.children[0]

            if (svgNode && 'properties' in svgNode && (svgNode as SvgElement).properties?.viewBox) {
              // 提取 viewBox
              const viewBox = (svgNode as SvgElement).properties.viewBox as string
              const [, , width, height] = viewBox.split(' ').map(Number)

              // 提取 SVG 内容
              const body = svgContent
                .replace(/<svg[^>]*>/g, '')
                .replace(/<\/svg>/g, '')
                .replace(/[\n\r\t]/g, '')
                .replace(/\s+/g, ' ')
                .trim()

              // 添加到 icons 集合
              iconifyJSON.icons[iconName] = {
                body,
                width: width || 1024,
                height: height || 1024,
              }
            }
          }
          catch (error) {
            console.error(`Error processing ${file}:`, error)
          }
        })

        // 生成虚拟模块代码
        return `
import { addCollection } from '@iconify/vue'

const iconSet = ${JSON.stringify(iconifyJSON)}
addCollection(iconSet)

// 导出图标列表供类型提示使用
export const icons = ${JSON.stringify(Object.keys(iconifyJSON.icons).map(name => `${options.prefix}:${name}`))}
`
      }
    },

    configResolved(config) {
      // 确保类型声明文件目录存在
      const typesDir = path.resolve(config.root, 'types')
      if (!fs.existsSync(typesDir)) {
        fs.mkdirSync(typesDir, { recursive: true })
      }

      // 生成类型声明文件
      const dtsContent = `declare module 'virtual:local-icons' {
  export const icons: string[]
}`

      fs.writeFileSync(
        dts,
        dtsContent,
      )
    },
  }
}
