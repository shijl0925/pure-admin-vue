<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { BarChart, LineChart, RingChart } from '@/components/chart'

import CardList from './components/CardList.vue'

const { t } = useI18n()
</script>

<template>
  <div class="m-2 flex flex-col gap-2">
    <a-card :bordered="false" :body-style="{ padding: '16px' }">
      <CardList />
    </a-card>
    <a-row :gutter="[8, 8]">
      <a-col :xs="24" :sm="24" :md="14">
        <a-card :title="t('page.home.sales')" :bordered="false" :body-style="{ padding: '16px' }">
          <BarChart
            :data="[
              { name: t('page.home.lastYear'), data: [125, 186, 154, 210, 243, 278, 210, 232] },
              { name: t('page.home.thisYear'), data: [220, 182, 191, 234, 290, 330, 310, 322] },
            ]"
            :x-axis-data="[t('page.home.January'), t('page.home.February'), t('page.home.March'), t('page.home.April'), t('page.home.May'), t('page.home.June'), t('page.home.July'), t('page.home.August')]"
            show-legend
            :legend-data="[t('page.home.lastYear'), t('page.home.thisYear')]"
            bar-width="20%"
          />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="10">
        <a-card :title="t('page.home.salesDistribution')" :bordered="false" :body-style="{ padding: '16px' }">
          <RingChart
            :data="[
              { value: 42, name: t('page.home.domesticMarket') },
              { value: 28, name: t('page.home.asiaPacificMarket') },
              { value: 30, name: t('page.home.europeanMarket') },
            ]"
            :color="['#4C87F3', '#93F1B4', '#8BD8FC']"
            :radius="['0%', '80%']"
          />
        </a-card>
      </a-col>
      <a-col :span="24">
        <a-card :title="t('page.home.customerSatisfaction')" :bordered="false" :body-style="{ padding: '16px' }">
          <LineChart
            :data="[
              { name: t('page.home.lastMonth'), data: [65, 72, 58, 74, 52, 85, 78, 83, 92, 84, 89, 95] },
              { name: t('page.home.thisMonth'), data: [78, 75, 82, 86, 90, 94, 88, 91, 96, 93, 97, 99] },
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
