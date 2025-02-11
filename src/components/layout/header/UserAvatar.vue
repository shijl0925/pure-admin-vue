<script setup lang="ts">
import { IconButton } from '@/components/button'
import { Icon } from '@/components/icon'

function handleClick() {
}
</script>

<template>
  <a-dropdown placement="bottom">
    <template #overlay>
      <a-menu @click="handleClick">
        <a-menu-item key="1">
          <Icon icon="icon-park-outline:user" class="mr-0.5" />
          个人中心
        </a-menu-item>
        <a-menu-item key="2">
          <Icon icon="icon-park-outline:logout" class="mr-0.5" />
          退出登录
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
