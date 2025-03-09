<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { batchDeleteRoleApi, deleteRoleApi, getRoleListApi } from '@/apis/role'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { ROLE } from '@/constants/permissions'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

const { t } = useI18n()

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableContainer()

const {
  formRef,
  formState,
  tableProps,
  isLoading,
  isDeleting,
  handleSearch,
  handleReset,
  handleCreate,
  handleEdit,
  handleDelete,
  handleBatchDelete,
  isBatchDeleting,
  selectedCount,
  selectedIsEmpty,
} = useTable({
  key: 'role', // 表格唯一标识，不要与其他模块重名
  cacheEnabled: true, // 是否启用缓存
  dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
  pagination: true, // 是否开启分页
  selectable: true, // 是否开启选择
  listApiFn: getRoleListApi, // 获取列表数据
  deleteApiFn: deleteRoleApi, // 删除数据
  batchDeleteApiFn: batchDeleteRoleApi, // 批量删除数据
  scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
  form: {
    name: null,
    code: null,
  },
  columns: computed(() => [
    { title: t('page.systemRole.name'), dataIndex: 'name' },
    { title: t('page.systemRole.code'), dataIndex: 'code' },
    { title: t('common.actions'), key: 'actions', fixed: 'right', width: 100 },
  ]),
})
</script>

<template>
  <SearchTableContainer v-bind="listContainerProps">
    <template #searchForm>
      <a-form
        :ref="(el: FormInstance) => formRef = el"
        :model="formState"
        :colon="false"
        autocomplete="off"
        @finish="handleSearch"
      >
        <SearchContainer>
          <SearchRow>
            <SearchCol name="name" :label="t('page.systemRole.name')">
              <a-input v-model:value="formState.name" />
            </SearchCol>
            <SearchCol name="code" :label="t('page.systemRole.code')">
              <a-input v-model:value="formState.code" />
            </SearchCol>
          </SearchRow>
          <template #actions>
            <a-space>
              <SearchButton :loading="isLoading" />
              <ResetButton @click="handleReset" />
            </a-space>
            <a-divider type="vertical" />
            <Permission :permission="ROLE.DELETE">
              <BatchDeleteButton :loading="isBatchDeleting" :disabled="selectedIsEmpty" :count="selectedCount" @confirm="handleBatchDelete" />
            </Permission>
            <a-divider type="vertical" />
            <Permission :permission="ROLE.CREATE">
              <CreateButton @click="handleCreate" />
            </Permission>
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <Permission :permission="ROLE.UPDATE">
            <EditButton type="text" size="small" no-text @click="handleEdit(record)" />
          </Permission>
          <Permission :permission="ROLE.DELETE">
            <DeleteButton type="text" size="small" no-text :loading="isDeleting" @confirm="handleDelete(record.id)" />
          </Permission>
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
