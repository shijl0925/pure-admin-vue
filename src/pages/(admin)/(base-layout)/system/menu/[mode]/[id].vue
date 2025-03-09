<script setup lang="ts">
import type { FormInstance, FormProps, RadioGroupProps } from 'ant-design-vue'

import { computed, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'

import { createMenuApi, getMenuDetailApi, updateMenuApi } from '@/apis/menu'
import { SaveButton } from '@/components/button'
import { FormContainer } from '@/components/container'
import { IconSelect } from '@/components/icon'
import { MENU_TYPE } from '@/constants/menu'
import { useForm } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

import ParentName from '../components/ParentName.vue'

const { t } = useI18n()

const { getTransferredData } = usePageTransfer()

const data = getTransferredData()

const {
  title,
  isCreateMode,
  isEditMode,
  formRef,
  formProps,
  formState,
  isLoading,
  handleSubmit,
} = useForm({
  key: 'menu', // 与列表页的 key 保持一致，用来提交数据后，使列表页数据刷新
  getApiFn: getMenuDetailApi, // 获取数据接口
  createApiFn: createMenuApi, // 创建数据接口
  updateApiFn: updateMenuApi, // 更新数据接口
  form: {
    parentId: data?.id,
    title: null,
    type: null,
    icon: null,
    path: null,
    code: null,
    description: null,
    i18nKey: null,
    sort: 0,
    isShow: true,
  },
  rules: computed((): FormProps['rules'] => {
    return {
      title: {
        required: true,
        message: t('page.systemMenu.rules.title'),
      },
      type: {
        required: true,
        message: t('page.systemMenu.rules.type'),
      },
      ...(formState.value.type === MENU_TYPE.MENU
        ? {
            path: {
              required: true,
              message: t('page.systemMenu.rules.path'),
            },
          }
        : {}),
    }
  }),
})

const parentId = computed(() => {
  return isCreateMode ? data?.id : formState.value.parentId
})

const menuTypeOptions = computed(() => {
  const allOptions = [
    { label: t('page.systemMenu.directory'), value: MENU_TYPE.DIRECTORY },
    { label: t('page.systemMenu.menu'), value: MENU_TYPE.MENU },
    { label: t('page.systemMenu.feature'), value: MENU_TYPE.FEATURE },
  ]

  if (isCreateMode) {
    if (!data.id) {
      return allOptions.filter(option => option.value !== MENU_TYPE.FEATURE)
    }

    if (data.type === MENU_TYPE.DIRECTORY) {
      return allOptions.filter(option => option.value !== MENU_TYPE.FEATURE)
    }

    if (data.type === MENU_TYPE.MENU) {
      return allOptions.filter(option => option.value === MENU_TYPE.FEATURE)
    }

    return allOptions
  }
  else {
    return allOptions.filter(option => option.value === formState.value.type)
  }
})

const handleChangeType: RadioGroupProps['onChange'] = async (e) => {
  formState.value.icon = null
  formState.value.path = null
  formState.value.code = null
  await nextTick()
  if (e.target.value === MENU_TYPE.DIRECTORY || e.target.value === MENU_TYPE.FEATURE) {
    formRef.value?.clearValidate('path')
  }
}
</script>

<template>
  <FormContainer :title="title">
    <a-form :ref="(el: FormInstance) => formRef = el" v-bind="formProps" @finish="handleSubmit">
      <a-form-item :label="t('page.systemMenu.parentMenu')">
        <ParentName :value="parentId" />
      </a-form-item>
      <a-form-item :label="t('page.systemMenu.title')" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
      <a-form-item :label="t('page.systemMenu.description')" name="description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>
      <a-form-item :label="t('page.systemMenu.type')" name="type">
        <a-radio-group
          v-model:value="formState.type"
          option-type="button"
          :options="menuTypeOptions"
          :disabled="isEditMode"
          @change="handleChangeType"
        />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type !== MENU_TYPE.FEATURE" :label="t('page.systemMenu.icon')" name="icon">
        <IconSelect v-model:value="formState.icon" />
      </a-form-item>
      <a-form-item v-if="formState.type && formState.type === MENU_TYPE.MENU" :label="t('page.systemMenu.path')" name="path">
        <a-input v-model:value="formState.path" />
      </a-form-item>
      <a-form-item v-if="formState.type && (formState.type === MENU_TYPE.MENU || formState.type === MENU_TYPE.FEATURE)" :label="t('page.systemMenu.code')" name="code">
        <a-input v-model:value="formState.code" />
      </a-form-item>
      <a-form-item v-if="formState.type && (formState.type === MENU_TYPE.DIRECTORY || formState.type === MENU_TYPE.MENU)" :label="t('page.systemMenu.i18nKey')" name="i18nKey">
        <a-input v-model:value="formState.i18nKey" />
      </a-form-item>
      <a-form-item :label="t('page.systemMenu.sort')" name="sort">
        <a-input-number v-model:value="formState.sort" :min="0" :precision="0" />
      </a-form-item>
      <a-form-item v-if="formState.type === MENU_TYPE.MENU" :label="t('page.systemMenu.isShow')" name="isShow">
        <a-switch v-model:checked="formState.isShow" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <SaveButton type="primary" :loading="isLoading" />
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
