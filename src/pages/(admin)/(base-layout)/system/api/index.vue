<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { deleteApiApi, getApiTreeApi } from '@/apis/api'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { API_TYPE } from '@/constants/api'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

const { t } = useI18n()

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableContainer()

const {
  tableProps,
  isLoading,
  isDeleting,
  handleReset,
  handleCreate,
  handleEdit,
  handleDelete,
} = useTable({
  key: 'api',
  pagination: false,
  listApiFn: getApiTreeApi,
  deleteApiFn: deleteApiApi,
  columns: computed(() => [
    { title: t('page.systemApi.title'), dataIndex: 'title' },
    { title: t('page.systemApi.type'), dataIndex: 'type' },
    { title: t('page.systemApi.method'), dataIndex: 'method' },
    { title: t('page.systemApi.path'), dataIndex: 'path' },
    { title: t('page.systemApi.code'), dataIndex: 'code' },
    { title: t('page.systemApi.sort'), dataIndex: 'sort' },
    { title: t('common.actions'), key: 'actions', fixed: 'right', width: 150 },
  ]),
  scrollY: tableScrollY,
})
</script>

<template>
  <SearchTableContainer v-bind="listContainerProps">
    <template #searchForm>
      <a-form :colon="false">
        <SearchContainer>
          <template #actions>
            <RefreshButton :loading="isLoading" @click="handleReset" />
            <a-divider type="vertical" />
            <CreateButton @click="handleCreate({ id: null })" />
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <a-tag v-if="record.type === API_TYPE.DIRECTORY">
            {{ t('page.systemApi.directory') }}
          </a-tag>
          <a-tag v-else color="blue">
            {{ t('page.systemApi.api') }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'method'">
          <a-tag v-if="record.method" color="green">
            {{ record.method }}
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <Button v-if="record.type === API_TYPE.DIRECTORY" icon="icon-park-outline:tree-diagram" type="text" size="small" no-text @click="handleCreate(record)" />
          <EditButton type="text" size="small" no-text @click="handleEdit(record, record)" />
          <DeleteButton
            v-if="!record.children || record.children.length === 0"
            type="text"
            size="small"
            no-text
            :loading="isDeleting"
            @confirm="handleDelete(record.id)"
          />
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
