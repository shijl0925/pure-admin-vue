<script setup lang="ts">
import { ref } from 'vue'

import { ListContainer, SearchCol, SearchRow } from '@/components/container'
import { useList } from '@/hooks/useList'

const {
  listContainerProps,
  tableProps,
} = useList()

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
</script>

<template>
  <ListContainer v-bind="listContainerProps">
    <template #searchForm>
      <a-form :colon="false">
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
          <template v-if="isVisible">
            <SearchCol label="input5">
              <a-input />
            </SearchCol>
            <SearchCol label="input6">
              <a-input />
            </SearchCol>
          </template>
        </SearchRow>
      </a-form>
      <a-button type="primary" @click="isVisible = !isVisible">
        搜索
      </a-button>
    </template>
    <a-table
      bordered
      :data-source="dataSource"
      :columns="columns"
      :pagination="{
        pageSize: 10,
        total: 20,
      }"
      v-bind="tableProps"
    />
  </ListContainer>
</template>
