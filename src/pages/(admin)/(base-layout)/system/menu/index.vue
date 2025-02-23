<script setup lang="ts">
import { ref } from 'vue'

import type { Menu } from '@/types/menu'

import { deleteMenuApi, getMenuTreeApi } from '@/apis/menu'
import { Button, CreateButton, DeleteButton, EditButton } from '@/components/button'
import { SearchContainer, SearchTableLayout } from '@/components/container'
import { Icon } from '@/components/icon'
import { useSearchTableLayout } from '@/hooks/useSearchTableLayout'
import { useTable } from '@/hooks/useTable'

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableLayout()

const {
  tableProps,
  isDeleting,
  handleCreate,
  handleEdit,
  handleDelete,
} = useTable({
  key: 'menu',
  pagination: false,
  listApiFn: getMenuTreeApi,
  deleteApiFn: deleteMenuApi,
  columns: [
    { title: '名称', dataIndex: 'title' },
    { title: '类型', dataIndex: 'type' },
    { title: '图标', dataIndex: 'icon' },
    { title: '路径', dataIndex: 'path' },
    { title: '权限标识', dataIndex: 'code' },
    { title: '排序', dataIndex: 'sort' },
    { title: '操作', key: 'actions', fixed: 'right', width: 150 },
  ],
  scrollY: tableScrollY,
})

function handleCreateChild(record: Menu) {
  console.log(record)
}
</script>

<template>
  <SearchTableLayout v-bind="listContainerProps">
    <template #searchForm>
      <a-form :colon="false">
        <SearchContainer>
          <template #actions>
            <CreateButton @click="handleCreate" />
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'icon'">
          <Icon :icon="record.icon" />
        </template>
        <template v-if="column.key === 'actions'">
          <Button icon="icon-park-outline:tree-diagram" type="text" size="small" no-text @click="handleCreateChild(record)" />
          <EditButton type="text" size="small" no-text @click="handleEdit(record)" />
          <DeleteButton v-if="!record.children || record.children.length === 0" type="text" size="small" no-text :loading="isDeleting" @confirm="handleDelete(record.id)" />
          <template v-if="record.type === 'DIRECTORY'" />
        </template>
      </template>
    </a-table>
  </SearchTableLayout>
</template>
