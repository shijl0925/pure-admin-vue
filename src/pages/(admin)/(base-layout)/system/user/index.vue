<script setup lang="ts">
import type { User, UserListParams } from '@/types/user'

import { getUserListApi } from '@/apis/user'
import { SearchCol, SearchContainer, SearchRow, SearchTableLayout } from '@/components/container'
import { useSearchTableLayout } from '@/hooks/useSearchTableLayout'
import { useTable } from '@/hooks/useTable'

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableLayout()

const {
  isLoading,
  formState,
  handleSearch,
  tableProps,
  onBeforeRequest,
  onAfterRequest,
} = useTable<User, UserListParams>({
  key: 'users',
  apiFn: getUserListApi,
  scrollY: tableScrollY,
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
    { title: '是否冻结', dataIndex: 'isFrozen' },
    { title: '创建时间', dataIndex: 'createTime' },
    { title: '更新时间', dataIndex: 'updateTime' },
  ],
})

onBeforeRequest((form) => {
  return {
    ...form,
    xyz: '123',
  }
})

onAfterRequest((list) => {
  console.log('list', list)
  return list.map(item => ({
    ...item,
    isFrozen: 0,
  }))
})
</script>

<template>
  <SearchTableLayout v-bind="listContainerProps">
    <template #searchForm>
      <a-form :model="formState" :colon="false" @finish="handleSearch">
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
            <a-button type="primary" html-type="submit" :loading="isLoading">
              搜索
            </a-button>
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps" />
  </SearchTableLayout>
</template>
