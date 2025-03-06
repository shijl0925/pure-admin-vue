<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { SearchTableContainer } from '@/components/container'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

import { userList } from '../mockData'

const { t } = useI18n()
function getListApi() {
  return Promise.resolve(userList)
}

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableContainer()

const {
  tableProps,
} = useTable({
  key: 'table-height-example',
  pagination: false,
  listApiFn: getListApi,
  scrollY: tableScrollY,
  columns: computed(() => [
    { title: t('page.tableAutoHeightExample.name'), dataIndex: 'name' },
    { title: t('page.tableAutoHeightExample.age'), dataIndex: 'age' },
    { title: 'Column 1', dataIndex: 'address' },
    { title: 'Column 2', dataIndex: 'address' },
    { title: 'Column 3', dataIndex: 'address' },
  ]),
})
</script>

<template>
  <SearchTableContainer v-bind="listContainerProps">
    <a-table v-bind="tableProps" />
  </SearchTableContainer>
</template>
