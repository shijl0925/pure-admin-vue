<script setup lang="ts">
import { FormContainer } from '@/components/container'
import { usePageTransfer } from '@/hooks/usePageTransfer'

const { getTransferredData } = usePageTransfer()

const data = getTransferredData()
</script>

<template>
  <FormContainer title="接收数据">
    {{ data }}
  </FormContainer>
</template>
