<script setup lang="ts">
import { ref } from 'vue'

import { SearchCol, SearchContainer, SearchRow, SearchTableLayout } from '@/components/container'
import { useSearchTableLayout } from '@/hooks/useSearchTableLayout'
import { useTable } from '@/hooks/useTable'

const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
])

const {
  listContainerProps,
  tableScrollY,
} = useSearchTableLayout()

const {
  tableProps,
} = useTable({
  key: 'menus',
  apiFn: () => {
    return Promise.resolve([])
  },
  columns,
  scrollY: tableScrollY,
})

const isVisible = ref(false)

const dataSource = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '3',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '4',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '6',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '7',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '8',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '9',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
  {
    key: '10',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
</script>

<template>
  <SearchTableLayout v-bind="listContainerProps">
    <template #searchForm>
      <a-form :colon="false">
        <SearchContainer>
          <SearchRow>
            <SearchCol label="input1">
              <a-input />
            </SearchCol>
            <SearchCol label="input2">
              <a-input />
            </SearchCol>
            <SearchCol label="input3">
              <a-input />
            </SearchCol>
            <SearchCol label="input4">
              <a-input />
            </SearchCol>
          </SearchRow>
          <template #extra>
            <SearchRow>
              <SearchCol label="input5">
                <a-input />
              </SearchCol>
              <SearchCol label="input6">
                <a-input />
              </SearchCol>
            </SearchRow>
          </template>
          <template #actions>
            <a-button type="primary" @click="isVisible = !isVisible">
              搜索
            </a-button>
            <a-button type="primary" @click="isVisible = !isVisible">
              搜索2
            </a-button>
          </template>
        </SearchContainer>
      </a-form>
    </template>
    <a-table
      :data-source="dataSource"
      :pagination="false"
      v-bind="tableProps"
    />
  </SearchTableLayout>
</template>
