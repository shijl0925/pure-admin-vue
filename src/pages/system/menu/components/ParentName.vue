<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import { isNil } from 'es-toolkit'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { getFlatMenuApi } from '@/apis/menu'

const { value } = defineProps<{
  value: number | null
}>()

const { t } = useI18n()

const { data: flatMenu } = useQuery({
  queryKey: ['flatMenu'],
  queryFn: getFlatMenuApi,
})

const parentName = computed(() => {
  if (isNil(value)) {
    return t('page.systemMenu.topMenu')
  }
  return flatMenu.value?.find(menu => menu.id === value)?.title
})
</script>

<template>
  <a-input :value="parentName" disabled />
</template>
