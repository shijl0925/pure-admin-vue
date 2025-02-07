<route lang="yaml">
  meta:
    isPublic: true
</route>

<script setup lang="ts">
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'

import { Wave } from '@/components/login'
</script>

<template>
  <div class="relative bg-login">
    <div class="flex flex-col items-center justify-center w-screen py-10 min-h-[80vh]">
      <div class="space-y-4">
        <div class="text-4xl text-center text-white">
          Pure Admin
        </div>
        <div class="p-4 transition-all border shadow rounded-xl hover:shadow-2xl w-80 bg-white/80">
          <a-form>
            <a-form-item name="username">
              <a-input size="large" allow-clear placeholder="请输入用户名">
                <template #prefix>
                  <UserOutlined style="color: #D9D9D9;" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password size="large" allow-clear placeholder="请输入密码">
                <template #prefix>
                  <LockOutlined style="color: #D9D9D9;" />
                </template>
              </a-input-password>
            </a-form-item>
            <a-form-item>
              <a-button type="primary" html-type="submit" size="large" block>
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
    <Wave />
  </div>
</template>
