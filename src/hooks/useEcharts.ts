import type { EChartsOption } from 'echarts'

import { useDebounceFn, useElementSize } from '@vueuse/core'
import * as echarts from 'echarts/core'
import { storeToRefs } from 'pinia'
import { onUnmounted, ref, watch } from 'vue'

import { useAppStore } from '@/stores'

export function useEcharts(initOptions?: EChartsOption) {
  const appStore = useAppStore()
  const { isDark } = storeToRefs(appStore)

  const chartRef = ref<HTMLElement>()
  let chart: echarts.ECharts | null = null

  // 使用 useElementSize 监听容器尺寸变化
  const { width } = useElementSize(chartRef)

  // 使用 useDebounceFn 为 resize 添加防抖处理
  const handleResize = useDebounceFn(() => {
    chart?.resize()
  }, 100)

  // 监听容器尺寸变化
  watch(width, () => {
    handleResize()
  })

  // 坐标轴线样式
  const getAxisLineStyle = (show = true) => ({
    show,
    lineStyle: {
      color: isDark.value ? '#444' : '#e8e8e8',
      width: 1,
    },
  })

  // 分割线样式
  const getSplitLineStyle = (show = true) => ({
    show,
    lineStyle: {
      color: isDark.value ? '#444' : '#e8e8e8',
      width: 1,
      type: 'dashed' as const,
    },
  })

  // 坐标轴标签样式
  const getAxisLabelStyle = () => ({
    show: true,
    color: '#999',
    fontSize: 13,
  })

  // 坐标轴刻度样式
  const getAxisTickStyle = () => ({
    show: false,
  })

  const initChart = (options: EChartsOption = {}) => {
    if (!chartRef.value)
      return

    // 如果已存在图表实例，先销毁
    if (chart) {
      chart.dispose()
      chart = null
    }

    chart = echarts.init(chartRef.value)
    chart.setOption({
      ...initOptions,
      ...options,
    })
  }

  const updateChart = (options: EChartsOption) => {
    chart?.setOption(options)
  }

  onUnmounted(() => {
    if (chart) {
      chart.dispose()
      chart = null
    }
  })

  return {
    isDark,
    chartRef,
    initChart,
    updateChart,
    handleResize,
    getAxisLineStyle,
    getSplitLineStyle,
    getAxisLabelStyle,
    getAxisTickStyle,
  }
}
