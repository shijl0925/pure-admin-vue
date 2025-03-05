<script setup lang="ts">
import type { MenuProps } from 'ant-design-vue'

import { Modal } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

import { Icon } from '@/components/icon'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { logout } = userStore

const handleClick: MenuProps['onClick'] = (e) => {
  switch (e.key) {
    case 'userCenter':
      router.push('/user-center')
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
    <div>
      <a-button type="text">
        <template #icon>
          <Icon
            icon="icon-park-outline:user"
            class="text-base dark:text-theme-dark text-theme"
          />
        </template>
        <span class="pl-2 font-400">
          {{ userInfo?.nickName || userInfo?.username }}
        </span>
      </a-button>
    </div>
  </a-dropdown>
</template>
