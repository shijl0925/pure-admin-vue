<script setup lang="ts">
import { IconButton } from '@/components/button'

function handleMenuClick() {}
</script>

<template>
  <a-dropdown placement="bottom">
    <template #overlay>
      <a-menu @click="() => handleMenuClick()">
        <a-menu-item key="1">
          简体中文
        </a-menu-item>
        <a-menu-item key="2">
          English
        </a-menu-item>
      </a-menu>
    </template>
    <IconButton
      class="w-10"
      icon="icon-park-outline:translate"
      type="text"
      block
    />
  </a-dropdown>
</template>
