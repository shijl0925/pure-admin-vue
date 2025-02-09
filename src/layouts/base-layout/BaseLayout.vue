<script setup lang="ts">
import { Content, Header, Sider } from '@/components/layout'
</script>

<template>
  <a-layout>
    <Sider />
    <a-layout>
      <Header>
        <div>header</div>
      </Header>
      <Content>
        <div>content1</div>
        <div>content2</div>
        <div>content3</div>
        <div>content4</div>
        <div>content5</div>
        <div>content6</div>
      </Content>
    </a-layout>
  </a-layout>
</template>
