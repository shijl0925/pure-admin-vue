<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()

function handleBack() {
  router.push('/')
}
</script>

<template>
  <div class="h-screen flex items-center justify-center">
    <a-result status="404" title="404" :sub-title="t('page.notFound.subTitle')">
      <template #extra>
        <a-button type="primary" @click="handleBack">
          {{ t('common.backHome') }}
        </a-button>
      </template>
    </a-result>
  </div>
</template>
