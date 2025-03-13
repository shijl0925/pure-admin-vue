<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { RadarChart } from 'echarts/charts'
import {
  LegendComponent,
  RadarComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface RadarDataItem {
  name: string
  value: number[]
}

interface Props {
  indicator?: Array<{ name: string, max: number }>
  data?: RadarDataItem[]
  height?: string
  colors?: string[]
}

const {
  indicator = [],
  data = [],
  height = '16rem',
  colors = [],
} = defineProps<Props>()

echarts.use([
  RadarChart,
  TooltipComponent,
  LegendComponent,
  RadarComponent,
  CanvasRenderer,
])

const {
  chartRef,
  isDark,
  initChart,
  updateChart,
} = useEcharts()

const chartOptions = computed<EChartsOption>(() => {
  return {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      data: data.map(item => item.name),
      bottom: '0',
      textStyle: {
        color: isDark.value ? '#fff' : '#333',
      },
    },
    radar: {
      indicator,
      splitLine: {
        lineStyle: {
          color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      axisLine: {
        lineStyle: {
          color: isDark.value ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
      axisName: {
        color: '#999',
      },
    },
    series: [
      {
        type: 'radar',
        data: data.map((item, index) => ({
          name: item.name,
          value: item.value,
          symbolSize: 4,
          lineStyle: {
            width: 2,
            color: colors[index],
          },
          itemStyle: {
            color: colors[index],
          },
          areaStyle: {
            color: colors[index],
            opacity: 0.2,
          },
        })),
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
  <div ref="chartRef" class="radar-chart" :style="{ height }" />
</template>
