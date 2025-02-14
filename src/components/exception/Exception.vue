<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { status, title, subTitle } = defineProps<{
  status: string
  title: string
  subTitle: string
}>()

const router = useRouter()
const { t } = useI18n()

function handleBack() {
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <a-result :status="status" :title="title" :sub-title="subTitle">
      <template #extra>
        <a-button type="primary" @click="handleBack">
          {{ t('common.backHome') }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>
