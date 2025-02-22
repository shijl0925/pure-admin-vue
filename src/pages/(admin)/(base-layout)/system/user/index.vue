<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import type { User, UserListParams } from '@/types/user'

import { batchDeleteUserApi, deleteUserApi, getUserListApi } from '@/apis/user'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableLayout } from '@/components/container'
import { useSearchTableLayout } from '@/hooks/useSearchTableLayout'
import { useTable } from '@/hooks/useTable'

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableLayout()

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
} = useTable<User, UserListParams>({
  key: 'users',
  listApiFn: getUserListApi,
  deleteApiFn: deleteUserApi,
  batchDeleteApiFn: batchDeleteUserApi,
  scrollY: tableScrollY,
  selectable: true,
  form: {
    username: null,
    nickName: null,
    email: null,
    phoneNumber: null,
  },
  columns: [
    { title: '用户名', dataIndex: 'username' },
    { title: '昵称', dataIndex: 'nickName' },
    { title: '邮箱', dataIndex: 'email' },
    { title: '手机号', dataIndex: 'phoneNumber' },
    { title: '状态', dataIndex: 'isFrozen' },
    { title: '操作', key: 'actions', fixed: 'right', width: 100 },
  ],
})
</script>

<template>
  <SearchTableLayout v-bind="listContainerProps">
    <template #searchForm>
      <a-form :ref="(el: FormInstance) => formRef = el" :model="formState" :colon="false" @finish="handleSearch">
        <SearchContainer>
          <SearchRow>
            <SearchCol name="username" label="用户名">
              <a-input v-model:value="formState.username" />
            </SearchCol>
            <SearchCol name="nickName" label="昵称">
              <a-input v-model:value="formState.nickName" />
            </SearchCol>
            <SearchCol name="email" label="邮箱">
              <a-input v-model:value="formState.email" />
            </SearchCol>
            <SearchCol name="phoneNumber" label="手机号">
              <a-input v-model:value="formState.phoneNumber" />
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
  </SearchTableLayout>
</template>
