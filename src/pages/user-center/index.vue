<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'

import { message } from 'ant-design-vue'
import { reactive } from 'vue'
import { useI18n } from 'vue-i18n'

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
    return Promise.reject(new Error(t('page.userCenter.rules.passwordNotMatch')))
  }
  return Promise.resolve()
}

const { t } = useI18n()

const model = reactive<Model>({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const rules = {
  oldPassword: [
    { required: true, message: t('page.userCenter.rules.oldPassword') },
  ],
  newPassword: [
    { required: true, message: t('page.userCenter.rules.newPassword') },
    { min: 6, max: 16, message: t('page.userCenter.rules.passwordLength') },
  ],
  confirmPassword: [
    { required: true, message: t('page.userCenter.rules.confirmPassword') },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
}

async function handleSubmit(model: Model) {
  try {
    await updateUserPasswordApi(model)
    message.success(t('page.userCenter.success'))
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
      <a-form-item :label="t('page.userCenter.oldPassword')" name="oldPassword">
        <a-input-password v-model:value="model.oldPassword" />
      </a-form-item>
      <a-form-item :label="t('page.userCenter.newPassword')" name="newPassword">
        <a-input-password v-model:value="model.newPassword" />
      </a-form-item>
      <a-form-item :label="t('page.userCenter.confirmPassword')" name="confirmPassword">
        <a-input-password v-model:value="model.confirmPassword" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
