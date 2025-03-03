<script setup lang="ts">
import { BarChart, KLineChart, LineChart, RadarChart, RingChart, ScatterChart } from '@/components/chart'
import { BaseContainer } from '@/components/container'
</script>

<template>
  <BaseContainer title="图表">
    <a-row :gutter="[20, 20]">
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="柱状图">
          <BarChart
            :data="[125, 186, 154, 210, 243, 278]"
            :x-axis-data="['2018年', '2019年', '2020年', '2021年', '2022年', '2023年']"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="折线图">
          <LineChart
            :data="[65, 87, 92, 108, 136, 152]"
            :x-axis-data="['2023 Q1', 'Q2', 'Q3', 'Q4', '2024 Q1', 'Q2']"
            show-area-color
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="饼图">
          <RingChart
            :data="[
              { value: 42, name: '国内市场' },
              { value: 28, name: '亚太市场' },
              { value: 30, name: '欧美市场' },
            ]"
            :color="['#4C87F3', '#93F1B4', '#8BD8FC']"
            :radius="['0%', '80%']"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="雷达图">
          <RadarChart
            :indicator="[
              { name: '性能', max: 100 },
              { name: '价格', max: 100 },
              { name: '质量', max: 100 },
              { name: '服务', max: 100 },
              { name: '创新', max: 100 },
            ]"
            :data="[
              {
                name: '产品A',
                value: [85, 65, 90, 82, 78],
              },
              {
                name: '产品B',
                value: [75, 85, 82, 90, 88],
              },
            ]"
            :colors="['#8BD8FC', '#409EFF']"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="散点图">
          <ScatterChart
            :data="[
              { value: [2.5, 7.8] },
              { value: [3.2, 5.4] },
              { value: [4.1, 8.5] },
              { value: [5.6, 9.2] },
              { value: [6.3, 7.7] },
              { value: [7.1, 10.8] },
              { value: [8.9, 8.7] },
              { value: [9.4, 11.9] },
              { value: [10.2, 9.8] },
              { value: [11.5, 12.6] },
              { value: [12.3, 10.7] },
              { value: [13.1, 14.8] },
            ]"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :md="12" :lg="8">
        <a-card title="k线图">
          <KLineChart
            :data="[
              { time: '2024-03-01', open: 145, close: 152, high: 155, low: 143 },
              { time: '2024-03-02', open: 152, close: 148, high: 156, low: 147 },
              { time: '2024-03-03', open: 148, close: 158, high: 160, low: 146 },
            ]"
          />
        </a-card>
      </a-col>
    </a-row>
  </BaseContainer>
</template>
