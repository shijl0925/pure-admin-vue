/**
 * 扁平化树结构
 * @param items 树结构数据
 * @returns 扁平化后的数据
 */
export function flattenTree<
  T,
  K extends keyof T = 'children' extends keyof T ? 'children' : keyof T,
>(
  items: T[],
  childrenKey: K = 'children' as K,
): Omit<T, K>[] {
  const flatList: Omit<T, K>[] = []

  items.forEach((item) => {
    const { [childrenKey]: children, ...rest } = item

    flatList.push(rest as Omit<T, K>)

    if (children && Array.isArray(children) && children.length > 0) {
      flatList.push(...flattenTree(children as T[], childrenKey))
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
