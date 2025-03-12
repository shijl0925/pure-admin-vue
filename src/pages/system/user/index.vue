<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

import { batchDeleteUserApi, deleteUserApi, getUserListApi } from '@/apis/user'
import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
import { Permission } from '@/components/permission'
import { USER } from '@/constants/permissions'
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
  key: 'user', // 表格唯一标识，不要与其他模块重名
  cacheEnabled: true, // 是否启用缓存
  dataStaleTime: 1000 * 60 * 10, // 数据缓存时间，10 分钟
  pagination: true, // 是否开启分页
  selectable: true, // 是否开启选择
  listApiFn: getUserListApi, // 获取列表数据接口
  deleteApiFn: deleteUserApi, // 删除数据接口
  batchDeleteApiFn: batchDeleteUserApi, // 批量删除数据接口
  scrollY: tableScrollY, // 表格高度，从 useSearchTableContainer 获取
  form: {
    username: null,
    nickName: null,
    email: null,
    phone: null,
  },
  columns: computed(() => [
    { title: t('page.systemUser.username'), dataIndex: 'username' },
    { title: t('page.systemUser.nickName'), dataIndex: 'nickName' },
    { title: t('page.systemUser.email'), dataIndex: 'email' },
    { title: t('page.systemUser.phone'), dataIndex: 'phone' },
    { title: t('page.systemUser.isFrozen'), dataIndex: 'isFrozen' },
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
            <SearchCol name="username" :label="t('page.systemUser.username')">
              <a-input v-model:value="formState.username" />
            </SearchCol>
            <SearchCol name="nickName" :label="t('page.systemUser.nickName')">
              <a-input v-model:value="formState.nickName" />
            </SearchCol>
            <SearchCol name="email" :label="t('page.systemUser.email')">
              <a-input v-model:value="formState.email" />
            </SearchCol>
            <SearchCol name="phone" :label="t('page.systemUser.phone')">
              <a-input v-model:value="formState.phone" />
            </SearchCol>
          </SearchRow>
          <template #actions>
            <a-space>
              <SearchButton :loading="isLoading" />
              <ResetButton @click="handleReset" />
            </a-space>
            <a-divider type="vertical" />
            <Permission :permission="USER.DELETE">
              <BatchDeleteButton :loading="isBatchDeleting" :disabled="selectedIsEmpty" :count="selectedCount" @confirm="handleBatchDelete" />
            </Permission>
            <a-divider type="vertical" />
            <Permission :permission="USER.CREATE">
              <CreateButton @click="handleCreate" />
            </Permission>
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <Permission :permission="USER.UPDATE">
            <EditButton type="text" size="small" no-text @click="handleEdit(record)" />
          </Permission>
          <Permission :permission="USER.DELETE">
            <DeleteButton type="text" size="small" no-text :loading="isDeleting" @confirm="handleDelete(record.id)" />
          </Permission>
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
