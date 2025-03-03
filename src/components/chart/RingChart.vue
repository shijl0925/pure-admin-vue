<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'

interface Props {
  data?: Array<{ value: number, name: string }>
  height?: string
  color?: string[]
  radius?: string[]
}

const {
  data = [],
  height = '16rem',
  color = [],
  radius = ['50%', '80%'],
} = defineProps<Props>()

const {
  chartRef,
  isDark,
  initChart,
  updateChart,
} = useEcharts()

const chartOptions = computed<EChartsOption>(() => {
  return {
    series: [
      {
        name: '数据占比',
        type: 'pie',
        radius,
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
        },
        label: {
          show: true,
          formatter: '{b}\n{d}%',
          position: 'outside',
          color: '#999',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 25,
          smooth: true,
        },
        data,
        color,
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
  <div ref="chartRef" class="ring-chart" :style="{ height }" />
</template>
