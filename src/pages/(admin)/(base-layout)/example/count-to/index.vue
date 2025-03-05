<script setup lang="ts">
import { BaseContainer } from '@/components/container'
import { CountTo } from '@/components/count-to'
</script>

<template>
  <BaseContainer title="数字滚动">
    <h2>基础用法</h2>
    <CountTo :start-value="0" :end-value="1000" :duration="3000" />

    <h2 class="mt-4">
      带前缀后缀
    </h2>
    <CountTo :start-value="0" :end-value="2000" :duration="3000" prefix="¥" suffix="元" />

    <h2 class="mt-4">
      带小数
    </h2>
    <CountTo :start-value="0" :end-value="2000" :duration="3000" prefix="¥" suffix="元" :decimals="2" />
  </BaseContainer>
</template>
