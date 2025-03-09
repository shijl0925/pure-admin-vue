<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { deleteMenuApi, getMenuTreeApi } from '@/apis/menu'
import { Button, CreateButton, DeleteButton, EditButton, RefreshButton } from '@/components/button'
import { SearchContainer, SearchTableContainer } from '@/components/container'
import { Icon } from '@/components/icon'
import { Permission } from '@/components/permission'
import { MENU_TYPE } from '@/constants/menu'
import { MENU } from '@/constants/permissions'
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
  key: 'menu', // 表格唯一标识，不要与其他模块重名
  cacheEnabled: true, // 是否启用缓存
  dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
  pagination: false, // 是否开启分页
  listApiFn: getMenuTreeApi, // 获取列表数据接口
  deleteApiFn: deleteMenuApi, // 删除数据接口
  scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
  columns: computed(() => [
    { title: t('page.systemMenu.title'), dataIndex: 'title' },
    { title: t('page.systemMenu.type'), dataIndex: 'type' },
    { title: t('page.systemMenu.icon'), dataIndex: 'icon' },
    { title: t('page.systemMenu.path'), dataIndex: 'path' },
    { title: t('page.systemMenu.code'), dataIndex: 'code' },
    { title: t('page.systemMenu.sort'), dataIndex: 'sort' },
    { title: t('page.systemMenu.isShow'), dataIndex: 'isShow' },
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
            <Permission :permission="MENU.CREATE">
              <CreateButton @click="handleCreate({ id: null })" />
            </Permission>
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'type'">
          <a-tag v-if="record.type === MENU_TYPE.DIRECTORY">
            {{ t('page.systemMenu.directory') }}
          </a-tag>
          <a-tag v-else-if="record.type === MENU_TYPE.MENU" color="blue">
            {{ t('page.systemMenu.menu') }}
          </a-tag>
          <a-tag v-else color="cyan">
            {{ t('page.systemMenu.feature') }}
          </a-tag>
        </template>
        <template v-if="column.dataIndex === 'icon' && record.icon">
          <Icon :icon="record.icon" />
        </template>
        <template v-if="column.dataIndex === 'isShow'">
          <a-tag v-if="record.isShow" color="success">
            {{ t('page.systemMenu.show') }}
          </a-tag>
          <a-tag v-else color="danger">
            {{ t('page.systemMenu.hidden') }}
          </a-tag>
        </template>
        <template v-if="column.key === 'actions'">
          <Permission :permission="MENU.CREATE">
            <Button v-if="record.type !== MENU_TYPE.FEATURE" icon="icon-park-outline:tree-diagram" type="text" size="small" no-text @click="handleCreate(record)" />
          </Permission>
          <Permission :permission="MENU.UPDATE">
            <EditButton type="text" size="small" no-text @click="handleEdit(record, record)" />
          </Permission>
          <Permission :permission="MENU.DELETE">
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
