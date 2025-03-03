<script setup lang="ts">
import type { FormInstance } from 'ant-design-vue'

import { Modal } from 'ant-design-vue'

import type { BasePageParams } from '@/types/base'

import { BatchDeleteButton, CreateButton, DeleteButton, EditButton, ResetButton, SearchButton } from '@/components/button'
import { SearchCol, SearchContainer, SearchRow, SearchTableContainer } from '@/components/container'
import { useSearchTableContainer } from '@/hooks/useSearchTableContainer'
import { useTable } from '@/hooks/useTable'

import { userList } from '../mockData'

function getListApi({ page, pageSize }: BasePageParams) {
  return Promise.resolve({
    list: userList.slice((page - 1) * pageSize, page * pageSize),
    total: userList.length,
  })
}

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableContainer()

const {
  formRef,
  formState,
  tableProps,
  isLoading,
  selectedIsEmpty,
  selectedCount,
  handleReset,
} = useTable({
  key: 'data-table-example',
  pagination: true,
  listApiFn: getListApi,
  scrollY: tableScrollY,
  selectable: true,
  form: {
    param1: null,
    param2: null,
    param3: null,
    param4: null,
    param5: null,
    param6: null,
  },
  columns: [
    { title: '姓名', dataIndex: 'name' },
    { title: '年龄', dataIndex: 'age' },
    { title: 'Column 1', dataIndex: 'address' },
    { title: 'Column 2', dataIndex: 'address' },
    { title: 'Column 3', dataIndex: 'address' },
    { title: '操作', key: 'actions', fixed: 'right', width: 100 },
  ],
})

function handleNotice() {
  Modal.info({
    title: '提示',
    content: '此页面为展示，具体增删改查逻辑实现请参考文档或 【系统设置】 模块中相关页面及代码',
  })
}
</script>

<template>
  <SearchTableContainer v-bind="listContainerProps">
    <template #searchForm>
      <a-form
        :ref="(el: FormInstance) => formRef = el"
        :model="formState"
        :colon="false"
        autocomplete="off"
        @finish="handleNotice"
      >
        <SearchContainer>
          <SearchRow>
            <SearchCol name="param1" label="参数1">
              <a-input v-model:value="formState.param1" />
            </SearchCol>
            <SearchCol name="param2" label="参数2">
              <a-input v-model:value="formState.param2" />
            </SearchCol>
            <SearchCol name="param3" label="参数3">
              <a-input v-model:value="formState.param3" />
            </SearchCol>
            <SearchCol name="param4" label="参数4">
              <a-input v-model:value="formState.param4" />
            </SearchCol>
          </SearchRow>
          <template #extra>
            <SearchRow>
              <SearchCol name="param5" label="参数5">
                <a-input v-model:value="formState.param5" />
              </SearchCol>
              <SearchCol name="param6" label="参数6">
                <a-input v-model:value="formState.param6" />
              </SearchCol>
            </SearchRow>
          </template>
          <template #actions>
            <a-space>
              <SearchButton :loading="isLoading" />
              <ResetButton @click="handleReset" />
            </a-space>
            <a-divider type="vertical" />
            <BatchDeleteButton :disabled="selectedIsEmpty" :count="selectedCount" @confirm="handleNotice" />
            <a-divider type="vertical" />
            <CreateButton @click="handleNotice" />
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table v-bind="tableProps">
      <template #bodyCell="{ column }">
        <template v-if="column.key === 'actions'">
          <EditButton type="text" size="small" no-text @click="handleNotice" />
          <DeleteButton type="text" size="small" no-text @confirm="handleNotice" />
        </template>
      </template>
    </a-table>
  </SearchTableContainer>
</template>
