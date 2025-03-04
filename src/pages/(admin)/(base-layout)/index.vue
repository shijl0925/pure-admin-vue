<script setup lang="ts">
import { BarChart, LineChart, RingChart } from '@/components/chart'

// import { useI18n } from 'vue-i18n'
import CardList from './components/CardList.vue'

// const { t } = useI18n()
</script>

<template>
  <div class="m-2 flex flex-col gap-2">
    <a-card :bordered="false" :body-style="{ padding: '16px' }">
      <CardList />
    </a-card>
    <a-row :gutter="[8, 8]">
      <a-col :xs="24" :sm="24" :md="14">
        <a-card title="销售额" :bordered="false" :body-style="{ padding: '16px' }">
          <BarChart
            :data="[
              { name: '去年', data: [125, 186, 154, 210, 243, 278, 210, 232] },
              { name: '今年', data: [220, 182, 191, 234, 290, 330, 310, 322] },
            ]"
            :x-axis-data="['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月']"
            show-legend
            :legend-data="['去年', '今年']"
            bar-width="20%"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="10">
        <a-card title="销售分布" :bordered="false" :body-style="{ padding: '16px' }">
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
      <a-col :span="24">
        <a-card title="客户满意度" :bordered="false" :body-style="{ padding: '16px' }">
          <LineChart
            :data="[
              { name: '上月', data: [65, 72, 58, 74, 52, 85, 78, 83, 92, 84, 89, 95] },
              { name: '本月', data: [78, 75, 82, 86, 90, 94, 88, 91, 96, 93, 97, 99] },
            ]"
            :x-axis-data="['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']"
            show-area-color
            show-legend
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
