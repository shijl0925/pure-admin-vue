<script setup lang="ts">
import { Wave } from '@/components/login'

import styles from './login.module.scss'
</script>

<template>
  <div class="relative" :class="styles.header">
    <div class="flex flex-col items-center justify-center w-screen py-10 min-h-[80vh]">
      <div class="space-y-4">
        <div class="text-4xl text-center text-white">
          Pure Admin
        </div>
        <div class="p-4 transition-all border shadow rounded-xl hover:shadow-2xl w-80 bg-white/80">
          <a-form>
            <a-form-item name="username">
              <a-input size="large" />
            </a-form-item>
            <a-form-item name="password">
              <a-input size="large" />
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
