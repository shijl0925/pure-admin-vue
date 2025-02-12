<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { IconButton } from '@/components/button'
import { Icon } from '@/components/icon'

const { t } = useI18n()

function handleClick() {
}
</script>

<template>
  <a-dropdown
    placement="bottomRight"
    :overlay-style="{
      minWidth: '100px',
      maxWidth: '200px',
    }"
  >
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="1">
          <Icon icon="icon-park-outline:user" class="mr-0.5" />
          {{ t('common.userCenter') }}
        </a-menu-item>
        <a-menu-item key="2">
          <Icon icon="icon-park-outline:logout" class="mr-0.5" />
          {{ t('common.logout') }}
        </a-menu-item>
      </a-menu>
    </template>
    <IconButton
      icon="icon-park-outline:user"
      type="text"
    >
      <span class="pl-2 font-400">
        Admin
      </span>
    </IconButton>
  </a-dropdown>
</template>
