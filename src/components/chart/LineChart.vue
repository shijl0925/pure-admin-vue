<script setup lang="ts">
import type { EChartsOption } from 'echarts'

import { LineChart } from 'echarts/charts'
import {
  GridComponent,
  LegendComponent,
  TooltipComponent,
} from 'echarts/components'
import * as echarts from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { computed, onMounted, watch } from 'vue'

import { useEcharts } from '@/hooks/useEcharts'
import { hexToRgba } from '@/utils/color'

const {
  height = '16rem',
  data = [],
  xAxisData = [],
  color = '',
  lineWidth = 3,
  showAreaColor = false,
  showLegend = false,
} = defineProps<Props>()

echarts.use([
  LineChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  CanvasRenderer,
])

interface SeriesItem {
  name: string
  data: number[]
  color?: string
}

interface Props {
  data: number[] | SeriesItem[]
  xAxisData: string[]
  height?: string
  color?: string | string[]
  lineWidth?: number
  showAreaColor?: boolean
  showLegend?: boolean
}

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

const defaultColors = [
  '#0094FF',
  '#55D8FE',
  '#5C8EFF',
  '#3FA4FF',
  '#00C2F9',
  '#00D4C2',
  '#91CC75',
  '#FAC858',
  '#EE6666',
  '#73C0DE',
]

const isMultiSeries = computed(() => {
  return Array.isArray(data) && data.length > 0 && typeof data[0] === 'object' && 'name' in data[0]
})

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

  return defaultColors[index % defaultColors.length]
}

function getAreaStyle(seriesColor: string, enableAreaColor: boolean) {
  if (!enableAreaColor)
    return undefined

  return {
    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
      {
        offset: 0,
        color: hexToRgba(seriesColor, 0.2).rgba,
      },
      {
        offset: 1,
        color: hexToRgba(seriesColor, 0.01).rgba,
      },
    ]),
  }
}

const generateSeries = computed(() => {
  if (isMultiSeries.value) {
    return (data as SeriesItem[]).map((item, index) => {
      const seriesColor = getColor(index, item.color)
      return {
        name: item.name,
        type: 'line' as const,
        smooth: true,
        symbol: 'none',
        data: item.data,
        lineStyle: {
          width: lineWidth,
          color: seriesColor,
        },
        itemStyle: {
          color: seriesColor,
        },
        areaStyle: getAreaStyle(seriesColor, showAreaColor),
      }
    })
  }
  else {
    const seriesColor = getColor(0)

    return [{
      name: '数据',
      type: 'line' as const,
      smooth: true,
      symbol: 'none',
      data,
      lineStyle: {
        width: lineWidth,
        color: seriesColor,
      },
      itemStyle: {
        color: seriesColor,
      },
      areaStyle: getAreaStyle(seriesColor, showAreaColor),
    }]
  }
})

// 获取图例数据
const legendData = computed(() => {
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
      right: 15,
      bottom: bottomMargin,
      left: 0,
      containLabel: true,
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      show: showLegend,
      data: legendData.value,
      bottom: 0,
      left: 'center',
      itemWidth: 14,
      itemHeight: 14,
      textStyle: {
        fontSize: 12,
        color: isDark.value ? '#808290' : '#222B45',
      },
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
  <div ref="chartRef" :style="{ height }" :class="$style.lineChart" />
</template>

<style module lang="scss">
.lineChart {
  width: calc(100% + 10px);
}
</style>
