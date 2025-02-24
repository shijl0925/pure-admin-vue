import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageDataStore = defineStore('pageData', () => {
  // 存储页面间传递的数据
  const pageData = ref<Record<string, any>>({})

  // 设置数据
  const setData = (key: string, data: any) => {
    pageData.value[key] = data
  }

  // 获取数据
  const getData = (key: string) => {
    return pageData.value[key]
  }

  // 清除指定数据
  const clearData = (key: string) => {
    delete pageData.value[key]
  }

  // 清除所有数据
  const clearAllData = () => {
    pageData.value = {}
  }

  return {
    pageData,
    setData,
    getData,
    clearData,
    clearAllData,
  }
}, {
  persist: true,
})
