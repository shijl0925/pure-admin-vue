<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'

import { Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { IconButton } from '@/components/button'
import { Icon } from '@/components/icon'
import { useUserStore } from '@/stores/user'

const { t } = useI18n()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { logout } = userStore

const handleClick: MenuProps['onClick'] = (e) => {
  switch (e.key) {
    case 'userCenter':
      // router.push('/userCenter')
      break
    case 'logout':
      Modal.confirm({
        title: t('common.logoutConfirm'),
        onOk: () => {
          logout()
        },
      })
      break
  }
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
        <a-menu-item key="userCenter">
          <Icon icon="icon-park-outline:user" class="mr-0.5" />
          {{ t('common.userCenter') }}
        </a-menu-item>
        <a-menu-item key="logout">
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
        {{ userInfo?.username }}
      </span>
    </IconButton>
  </a-dropdown>
</template>
