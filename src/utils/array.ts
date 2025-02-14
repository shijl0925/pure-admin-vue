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
