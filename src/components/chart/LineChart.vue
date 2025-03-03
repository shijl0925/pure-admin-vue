<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { theme } from 'ant-design-vue'
import * as echarts from 'echarts'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'
import { hexToRgba } from '@/utils/color'

interface Props {
  data: number[]
  xAxisData: string[]
  height?: string
  color?: string
  lineWidth?: number
  showAreaColor?: boolean
}

const {
  height = '16rem',
  data = [],
  xAxisData = [],
  color = '',
  lineWidth = 3,
  showAreaColor = false,
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

const chartOptions = computed<EChartsOption>(() => {
  const computedColor = color || '#0094FF'

  return {
    grid: {
      top: 15,
      right: 15,
      bottom: 0,
      left: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
        type: 'line',
        smooth: true,
        symbol: 'none',
        lineStyle: {
          width: lineWidth,
          color: computedColor,
        },
        areaStyle: showAreaColor
          ? {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: color
                    ? hexToRgba(color, 0.2).rgba
                    : hexToRgba(token.value.colorPrimary, 0.2).rgba,
                },
                {
                  offset: 1,
                  color: color
                    ? hexToRgba(color, 0.01).rgba
                    : hexToRgba(token.value.colorPrimary, 0.01).rgba,
                },
              ]),
            }
          : undefined,
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
  <div ref="chartRef" :style="{ height }" :class="$style.lineChart" />
</template>

<style module lang="scss">
  .lineChart {
    width: calc(100% + 10px);
  }
</style>
