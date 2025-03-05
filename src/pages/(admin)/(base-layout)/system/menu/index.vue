<script setup lang="ts">
import { deleteMenuApi, getMenuTreeApi } from '@/apis/menu'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { Icon } from '@/components/icon'
import { MENU_TYPE } from '@/constants/menu'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

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
    { title: '是否显示', dataIndex: 'isShow' },
    { title: '操作', key: 'actions', fixed: 'right', width: 150 },
  ],
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
          <a-tag v-if="record.type === MENU_TYPE.DIRECTORY">
            目录
          </a-tag>
          <a-tag v-else-if="record.type === MENU_TYPE.MENU" color="blue">
            菜单
          </a-tag>
          <a-tag v-else color="cyan">
            功能
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'icon' && record.icon">
          <Icon :icon="record.icon" />
        </template>
        <template v-if="column.dataIndex === 'isShow'">
          <a-tag v-if="record.isShow" color="success">
            显示
          </a-tag>
          <a-tag v-else color="danger">
            隐藏
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <Button v-if="record.type !== MENU_TYPE.FEATURE" icon="icon-park-outline:tree-diagram" type="text" size="small" no-text @click="handleCreate(record)" />
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
