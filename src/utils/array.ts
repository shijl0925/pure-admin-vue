/**
 * 树节点类型
 */
type TreeNode<T extends Record<string, any>> = T & {
  children?: TreeNode<T>[]
}

/**
 * 扁平化树结构
 * @param items 树结构数据
 * @param childrenKey 子节点的键名，默认为 'children'
 * @returns 扁平化后的数据（不包含 children 字段）
 */
export function flattenTree<T extends Record<string, any>>(
  items: TreeNode<T>[],
  childrenKey: keyof TreeNode<T> = 'children',
): Omit<T, 'children'>[] {
  const flatList: Omit<T, 'children'>[] = []

  items.forEach((item) => {
    const { [childrenKey]: children, ...rest } = item

    // 添加当前节点（不包含 children）
    flatList.push(rest as Omit<T, 'children'>)

    // 递归处理子节点
    if (Array.isArray(children) && children.length > 0) {
      flatList.push(...flattenTree(children, childrenKey))
    }
  })

  return flatList
}

/**
 * 扁平数据节点的基本接口
 */
interface FlatNode {
  id: number | string
  parentId: number | string | null
  [key: string]: any
}

/**
 * 在扁平数据中查找节点及其所有父级节点
 * @param flatNodes 扁平化的数据数组
 * @param predicate 查找条件
 * @param options 配置选项
 * @returns 找到的节点路径数组
 */
export function findNodePathByFlat<T extends FlatNode>(
  flatNodes: T[],
  predicate: ((node: T) => boolean) | string | number,
  options: {
    idKey?: string
    parentKey?: string
    includeTarget?: boolean
    reverse?: boolean
  } = {},
): T[] {
  const {
    idKey = 'id',
    parentKey = 'parentId',
    includeTarget = true,
    reverse = false,
  } = options

  // 转换 predicate 为函数
  const predicateFn = typeof predicate === 'function'
    ? predicate
    : typeof predicate === 'string' || typeof predicate === 'number'
      ? (node: T) => node[idKey] === predicate
      : (_node: T) => false

  // 查找目标节点
  const targetNode = flatNodes.find(predicateFn)
  if (!targetNode)
    return []

  const nodePath: T[] = includeTarget ? [targetNode] : []
  let currentNode = targetNode

  // 查找所有父级节点
  while (currentNode[parentKey] !== null) {
    const parentNode = flatNodes.find(node =>
      node[idKey] === currentNode[parentKey],
    )
    if (!parentNode)
      break

    if (reverse) {
      nodePath.push(parentNode)
    }
    else {
      nodePath.unshift(parentNode)
    }
    currentNode = parentNode
  }

  return nodePath
}
