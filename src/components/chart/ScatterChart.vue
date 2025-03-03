<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { theme } from 'ant-design-vue'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface Props {
  data?: { value: number[] }[]
  color?: string
  height?: string
  symbolSize?: number
}

const {
  data = [],
  color,
  height = '16rem',
  symbolSize = 14,
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

const { token } = theme.useToken()

const chartOptions = computed<EChartsOption>(() => {
  const computedColor = color || token.value.colorPrimary

  return {
    grid: {
      top: 10,
      right: 10,
      bottom: 0,
      left: 3,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
      formatter(params: any) {
        return `(${params.value[0]}, ${params.value[1]})`
      },
    },
    xAxis: {
      type: 'value',
      axisTick: getAxisTickStyle(),
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      splitLine: getSplitLineStyle(),
    },
    yAxis: {
      type: 'value',
      axisLabel: getAxisLabelStyle(),
      axisLine: getAxisLineStyle(),
      axisTick: getAxisTickStyle(),
      splitLine: getSplitLineStyle(),
    },
    series: [
      {
        data,
        type: 'scatter',
        itemStyle: {
          color: computedColor,
        },
        symbolSize,
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
