<script setup lang="ts">
import type { EChartsOption } from 'echarts'

// 导入图表组件
import { BarChart } from 'echarts/charts'
// 导入所需组件
import {
  GraphicComponent,
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
// 导入组件需要的渲染器
import { CanvasRenderer } from 'echarts/renderers'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface SeriesItem {
  name: string
  data: number[]
  color?: string
}

interface Props {
  data?: number[] | SeriesItem[]
  xAxisData?: string[]
  showLegend?: boolean
  legendData?: string[]
  color?: string | string[]
  height?: string
  barWidth?: string | number
}

const {
  data = [],
  xAxisData = [],
  showLegend = false,
  legendData,
  color,
  height = '16rem',
  barWidth = '40%',
} = defineProps<Props>()

// 注册必要的组件
echarts.use([
  BarChart,
  CanvasRenderer,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  GraphicComponent,
])

const {
  chartRef,
  isDark,
  initChart,
  updateChart,
  getAxisLineStyle,
  getAxisLabelStyle,
  getAxisTickStyle,
  getSplitLineStyle,
} = useEcharts()

// 默认使用渐变主题色
const defaultColors = [
  // 蓝色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#83bff6' },
    { offset: 1, color: '#188df0' },
  ]),
  // 绿色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#5fd6a2' },
    { offset: 1, color: '#3fbb7d' },
  ]),
  // 橙色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#ffd26f' },
    { offset: 1, color: '#f59b44' },
  ]),
  // 红色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#ff9897' },
    { offset: 1, color: '#f35e5d' },
  ]),
  // 紫色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#bc95f4' },
    { offset: 1, color: '#8c5ad8' },
  ]),
  // 青色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#65e0e0' },
    { offset: 1, color: '#13c2c2' },
  ]),
  // 粉色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#ff9cc2' },
    { offset: 1, color: '#f5639c' },
  ]),
  // 深蓝渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#8395f3' },
    { offset: 1, color: '#4c63d9' },
  ]),
  // 浅绿渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#a5e8d0' },
    { offset: 1, color: '#5cc9a7' },
  ]),
  // 棕色渐变
  new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    { offset: 0, color: '#d8b596' },
    { offset: 1, color: '#b3835d' },
  ]),
]

// 判断是否为多系列数据
const isMultiSeries = computed(() => {
  return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'name' in data[0]
})

// 生成颜色（支持单系列和多系列）
function getColor(index: number, specificColor?: string) {
  // 优先使用指定的具体颜色
  if (specificColor) {
    return specificColor
  }

  if (color) {
    if (Array.isArray(color)) {
      return color[index % color.length]
    }

    return color
  }

  // 默认使用渐变色
  return defaultColors[index % defaultColors.length]
}

const generateSeries = computed(() => {
  if (isMultiSeries.value) {
    return (data as SeriesItem[]).map((item, index) => ({
      name: item.name,
      type: 'bar' as const,
      data: item.data,
      itemStyle: {
        borderRadius: 4,
        color: getColor(index, item.color),
      },
      barWidth,
    }))
  }
  else {
    return [{
      name: legendData && legendData.length > 0 ? legendData[0] : '数据',
      type: 'bar' as const,
      data,
      itemStyle: {
        borderRadius: 4,
        color: getColor(0),
      },
      barWidth,
    }]
  }
})

const effectiveLegendData = computed(() => {
  if (legendData && legendData.length > 0) {
    return legendData
  }

  // 如果没有传入legendData，则从系列数据中提取
  if (isMultiSeries.value) {
    return (data as SeriesItem[]).map(item => item.name)
  }

  return ['数据']
})

const chartOptions = computed<EChartsOption>(() => {
  // 计算底部边距，如果显示图例则增加空间
  const bottomMargin = showLegend ? 30 : 0

  return {
    grid: {
      top: 15,
      right: 0,
      bottom: bottomMargin,
      left: 0,
      containLabel: true,
    },
    legend: {
      show: showLegend,
      data: effectiveLegendData.value,
      bottom: 0,
      left: 'center',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 12,
        color: isDark.value ? '#808290' : '#222B45',
      },
      icon: 'roundRect',
      itemStyle: {
        borderRadius: 4,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    xAxis: {
      type: 'category',
      data: xAxisData,
      axisTick: getAxisTickStyle(),
      axisLine: getAxisLineStyle(),
      axisLabel: getAxisLabelStyle(),
    },
    yAxis: {
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      splitLine: getSplitLineStyle(),
    },
    series: generateSeries.value,
  }
})

watch([chartOptions, isDark], () => {
  updateChart(chartOptions.value)
}, { deep: true })

onMounted(() => {
  setTimeout(() => {
    initChart(chartOptions.value)
  }, 300)
})
</script>

<template>
  <div ref="chartRef" :style="{ height }" />
</template>
