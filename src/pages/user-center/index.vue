<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'

import { message } from 'ant-design-vue'
import { reactive } from 'vue'

import { updateUserPasswordApi } from '@/apis/user'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { formLabelCol, formWrapperCol } from '@/hooks/useForm'

interface Model {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

async function validateConfirmPassword(_rule: Rule, value: string) {
  if (value !== model.newPassword) {
    return Promise.reject(new Error('两次密码不一致'))
  }
  return Promise.resolve()
}

const model = reactive<Model>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码' },
    { min: 6, max: 16, message: '密码长度在6-16位之间' },
  ],
  confirmPassword: [
    { required: true, message: '请输入确认密码' },
    { validator: validateConfirmPassword, trigger: 'blur' },
    { min: 6, max: 16, message: '密码长度在6-16位之间' },
  ],
}

async function handleSubmit(model: Model) {
  try {
    await updateUserPasswordApi(model)
    message.success('密码修改成功')
  }
  catch (error) {
    console.error(error)
  }
}
</script>

<template>
  <FormContainer>
    <a-form
      :model="model"
      :rules="rules"
      :label-col="formLabelCol"
      :wrapper-col="formWrapperCol"
      autocomplete="off"
      @finish="handleSubmit"
    >
      <a-form-item label="旧密码" name="oldPassword">
        <a-input-password v-model:value="model.oldPassword" />
      </a-form-item>
      <a-form-item label="新密码" name="newPassword">
        <a-input-password v-model:value="model.newPassword" />
      </a-form-item>
      <a-form-item label="确认密码" name="confirmPassword">
        <a-input-password v-model:value="model.confirmPassword" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
