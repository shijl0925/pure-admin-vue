<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { theme } from 'ant-design-vue'
import * as echarts from 'echarts'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface Props {
  data?: number[]
  xAxisData?: string[]
  color?: string
  height?: string
  barWidth?: string | number
}

const {
  data = [],
  xAxisData = [],
  color,
  height = '16rem',
  barWidth = '40%',
} = defineProps<Props>()

const { token } = theme.useToken()

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

const computedColor = computed(() => {
  if (color)
    return color

  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: token.value.colorPrimaryBorderHover,

    },
    {
      offset: 1,
      color: token.value.colorPrimary,
    },
  ])
})

const chartOptions = computed<EChartsOption>(() => {
  return {
    grid: {
      top: 15,
      right: 0,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'item',
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
    series: [
      {
        data,
        type: 'bar',
        itemStyle: {
          borderRadius: 4,
          color: computedColor.value,
        },
        barWidth,
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
