<script setup lang="ts">
import { ref } from 'vue'

import { FormContainer } from '@/components/container'
import { formLabelCol, formWrapperCol } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

const { navigateWithData } = usePageTransfer()

const form = ref({
  name: '',
  age: '',
  gender: '',
  hobby: [],
})

const genderOptions = ref([
  { label: '男', value: 'male' },
  { label: '女', value: 'female' },
])

const hobbyOptions = ref([
  { label: '篮球', value: 'basketball' },
  { label: '足球', value: 'football' },
  { label: '羽毛球', value: 'badminton' },
  { label: '乒乓球', value: 'pingpong' },
  { label: '游泳', value: 'swimming' },
  { label: '跑步', value: 'running' },
  { label: '健身', value: 'gym' },
  { label: '读书', value: 'reading' },
])

function handleClick() {
  navigateWithData('/example/page-transfer/transferred', form.value)
}
</script>

<template>
  <FormContainer title="传输数据" :show-back="false">
    <a-form :model="form" :label-col="formLabelCol" :wrapper-col="formWrapperCol">
      <a-form-item label="姓名">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item label="年龄">
        <a-input-number v-model:value="form.age" :min="0" :max="100" :precision="0" style="width: 100%" />
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-model:value="form.gender" :options="genderOptions" />
      </a-form-item>
      <a-form-item label="爱好">
        <a-select v-model:value="form.hobby" :options="hobbyOptions" mode="multiple" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <a-button type="primary" @click="handleClick">
          传参
        </a-button>
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
