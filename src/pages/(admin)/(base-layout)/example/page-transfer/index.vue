<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { FormContainer } from '@/components/container'
import { formLabelCol, formWrapperCol } from '@/hooks/useForm'
import { usePageTransfer } from '@/hooks/usePageTransfer'

const { t } = useI18n()

const { navigateWithData } = usePageTransfer()

const form = ref({
  name: '',
  age: '',
  gender: '',
  hobby: [],
})

const genderOptions = ref([
  { label: t('common.gender.male'), value: 'male' },
  { label: t('common.gender.female'), value: 'female' },
])

const hobbyOptions = ref([
  { label: t('page.pageTransferExample.hobbyOptions.basketball'), value: 'basketball' },
  { label: t('page.pageTransferExample.hobbyOptions.football'), value: 'football' },
  { label: t('page.pageTransferExample.hobbyOptions.badminton'), value: 'badminton' },
  { label: t('page.pageTransferExample.hobbyOptions.pingpong'), value: 'pingpong' },
  { label: t('page.pageTransferExample.hobbyOptions.swimming'), value: 'swimming' },
  { label: t('page.pageTransferExample.hobbyOptions.running'), value: 'running' },
  { label: t('page.pageTransferExample.hobbyOptions.gym'), value: 'gym' },
  { label: t('page.pageTransferExample.hobbyOptions.reading'), value: 'reading' },
])

function handleClick() {
  navigateWithData('/example/page-transfer/transferred', form.value)
}
</script>

<template>
  <FormContainer :title="t('page.pageTransferExample.transfer')" :show-back="false">
    <a-form :model="form" :label-col="formLabelCol" :wrapper-col="formWrapperCol">
      <a-form-item :label="t('page.pageTransferExample.form.name')">
        <a-input v-model:value="form.name" />
      </a-form-item>
      <a-form-item :label="t('page.pageTransferExample.form.age')">
        <a-input-number v-model:value="form.age" :min="0" :max="100" :precision="0" style="width: 100%" />
      </a-form-item>
      <a-form-item :label="t('page.pageTransferExample.form.gender')">
        <a-select v-model:value="form.gender" :options="genderOptions" />
      </a-form-item>
      <a-form-item :label="t('page.pageTransferExample.form.hobby')">
        <a-select v-model:value="form.hobby" :options="hobbyOptions" mode="multiple" />
      </a-form-item>
      <a-form-item :wrapper-col="{ offset: 12, span: 8 }">
        <a-button type="primary" @click="handleClick">
          {{ t('page.pageTransferExample.form.button') }}
        </a-button>
      </a-form-item>
    </a-form>
  </FormContainer>
</template>
