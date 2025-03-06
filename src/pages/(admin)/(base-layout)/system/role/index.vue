<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { batchDeleteRoleApi, deleteRoleApi, getRoleListApi } from '@/apis/role'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
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
  key: 'role',
  pagination: true,
  listApiFn: getRoleListApi,
  deleteApiFn: deleteRoleApi,
  batchDeleteApiFn: batchDeleteRoleApi,
  scrollY: tableScrollY,
  selectable: true,
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
            <BatchDeleteButton :loading="isBatchDeleting" :disabled="selectedIsEmpty" :count="selectedCount" @confirm="handleBatchDelete" />
            <a-divider type="vertical" />
            <CreateButton @click="handleCreate" />
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <EditButton type="text" size="small" no-text @click="handleEdit(record)" />
          <DeleteButton type="text" size="small" no-text :loading="isDeleting" @confirm="handleDelete(record.id)" />
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
