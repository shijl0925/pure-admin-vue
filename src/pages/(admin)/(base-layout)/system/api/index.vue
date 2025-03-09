<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { deleteApiApi, getApiTreeApi } from '@/apis/api'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { API_TYPE } from '@/constants/api'
import { API } from '@/constants/permissions'
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
  key: 'api', // 表格唯一标识，不要与其他模块重名
  cacheEnabled: true, // 是否启用缓存
  dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
  pagination: false, // 是否开启分页
  scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
  listApiFn: getApiTreeApi, // 获取列表数据接口
  deleteApiFn: deleteApiApi, // 删除数据接口
  columns: computed(() => [
    { title: t('page.systemApi.title'), dataIndex: 'title' },
    { title: t('page.systemApi.type'), dataIndex: 'type' },
    { title: t('page.systemApi.method'), dataIndex: 'method' },
    { title: t('page.systemApi.path'), dataIndex: 'path' },
    { title: t('page.systemApi.code'), dataIndex: 'code' },
    { title: t('page.systemApi.sort'), dataIndex: 'sort' },
    { title: t('common.actions'), key: 'actions', fixed: 'right', width: 150 },
  ]),
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
            <Permission :permission="API.CREATE">
              <CreateButton @click="handleCreate({ id: null })" />
            </Permission>
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
          <Permission :permission="API.CREATE">
            <Button v-if="record.type === API_TYPE.DIRECTORY" icon="icon-park-outline:tree-diagram" type="text" size="small" no-text @click="handleCreate(record)" />
          </Permission>
          <Permission :permission="API.UPDATE">
            <EditButton type="text" size="small" no-text @click="handleEdit(record, record)" />
          </Permission>
          <Permission :permission="API.DELETE">
            <DeleteButton
              v-if="!record.children || record.children.length === 0"
              type="text"
              size="small"
              no-text
              :loading="isDeleting"
              @confirm="handleDelete(record.id)"
            />
          </Permission>
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
