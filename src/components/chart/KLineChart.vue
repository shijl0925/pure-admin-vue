<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface KLineDataItem {
  time: string
  open: number
  close: number
  high: number
  low: number
}

interface Props {
  data?: KLineDataItem[]
  height?: string
}

const {
  data = [],
  height = '16rem',
} = defineProps<Props>()

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

const chartOptions = computed<EChartsOption>(() => {
  return {
    grid: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 60,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
      formatter: (params: any) => {
        const item = params[0]
        const data = item.data
        return `
            时间：${data[0]}<br/>
            开盘：${data[1]}<br/>
            收盘：${data[2]}<br/>
            最低：${data[3]}<br/>
            最高：${data[4]}<br/>
          `
      },
    },
    xAxis: {
      type: 'category',
      axisTick: getAxisTickStyle(),
      data: data.map(item => item.time),
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
    },
    yAxis: {
      type: 'value',
      scale: true,
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      splitLine: getSplitLineStyle(),
    },
    series: [
      {
        type: 'candlestick',
        data: data.map(item => [item.open, item.close, item.low, item.high]),
        itemStyle: {
          color: '#4C87F3', // 上涨颜色
          color0: '#8BD8FC', // 下跌颜色
          borderColor: '#4C87F3', // 上涨边框颜色
          borderColor0: '#8BD8FC', // 下跌边框颜色
        },
      },
    ],
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
