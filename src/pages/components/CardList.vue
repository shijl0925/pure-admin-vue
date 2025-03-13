<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { CountTo } from '@/components/count-to'
import { Icon } from '@/components/icon'

const { t } = useI18n()
</script>

<template>
  <a-row :gutter="[20, 20]">
    <a-col :xs="24" :md="12" :lg="6">
      <div class="rd-8px from-#56cdf3 to-#719de3 bg-gradient-to-r px-16px pb-4px pt-8px text-white dark:from-#1a4b6b dark:to-#2c4876">
        <h3 class="text-16px">
          {{ t('page.home.hits') }}
        </h3>
        <div class="flex items-center justify-between pt-12px">
          <Icon icon="icon-park-outline:trend" class="text-30px" />
          <CountTo
            :start-value="1"
            :end-value="124596"
            class="text-30px"
          />
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :md="12" :lg="6">
      <div class="rd-8px from-#ec4786 to-#b955a4 bg-gradient-to-r px-16px pb-4px pt-8px text-white dark:from-#7a2343 dark:to-#5f2c54">
        <h3 class="text-16px">
          {{ t('page.home.tradingVolume') }}
        </h3>
        <div class="flex items-center justify-between pt-12px">
          <Icon icon="icon-park-outline:buy" class="text-30px" />
          <CountTo
            :start-value="1"
            :end-value="3785"
            class="text-30px"
          />
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :md="12" :lg="6">
      <div class="rd-8px from-#fcbc25 to-#f68057 bg-gradient-to-r px-16px pb-4px pt-8px text-white dark:from-#8c6914 dark:to-#8d4930">
        <h3 class="text-16px">
          {{ t('page.home.tradingValue') }}
        </h3>
        <div class="flex items-center justify-between pt-12px">
          <Icon icon="icon-park-outline:finance" class="text-30px" />
          <CountTo
            :start-value="1"
            :end-value="1523948"
            prefix="$"
            class="text-30px"
          />
        </div>
      </div>
    </a-col>
    <a-col :xs="24" :md="12" :lg="6">
      <div class="rd-8px from-#20c997 to-#198754 bg-gradient-to-r px-16px pb-4px pt-8px text-white dark:from-#125e47 dark:to-#0e4a2f">
        <h3 class="text-16px">
          {{ t('page.home.conversionRate') }}
        </h3>
        <div class="flex items-center justify-between pt-12px">
          <Icon icon="icon-park-outline:analysis" class="text-30px" />
          <CountTo
            :start-value="1"
            :end-value="3.04"
            :decimals="2"
            suffix="%"
            class="text-30px"
          />
        </div>
      </div>
    </a-col>
  </a-row>
</template>
