<route lang="yaml">
  meta:
    isPublic: true
</route>

<script setup lang="ts">
import type { CheckboxProps } from 'ant-design-vue'

import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import type { LoginData } from '@/types/auth'

import { loginApi } from '@/apis/auth'
import { Wave } from '@/components/login'
import { useAuthStore } from '@/stores'
import { deCode, enCode } from '@/utils/string'

const router = useRouter()

const authStore = useAuthStore()
const { token, refreshToken } = storeToRefs(authStore)

const formLoading = ref(false)

const form = reactive<LoginData>({
  username: 'pure-admin',
  password: '123456',
})

const rules = reactive({
  username: [{ required: true, message: '请输入用户名' }],
  password: [
    { required: true, message: '请输入密码' },
    { min: 6, message: '密码长度不能小于6个字符' },
  ],
})

const isRemember = ref(false)
const rememberKey = enCode('LOGIN_REMEMBER')
const rememberValueTrue = enCode('LOGIN_REMEMBER_TRUE')
const rememberUsernameKey = enCode('LOGIN_REMEMBER_USERNAME')
const rememberPasswordKey = enCode('LOGIN_REMEMBER_PASSWORD')

if (localStorage.getItem(rememberKey) === rememberValueTrue) {
  setRemember()
}

console.log(`🔥 ${rememberUsernameKey}`)
console.log(`🔥 ${deCode(rememberUsernameKey)}`)

// function onRememberChange(ev: CheckboxChangeEvent) {
//   if (!ev.target.checked) {
//     clearRemember()
//   }
// }

const onRememberChange: CheckboxProps['onChange'] = (e) => {
  if (!e.target.checked) {
    clearRemember()
  }
}

function onForgot() {
  // jump to forgot password page
}

async function onFinish(data: LoginData) {
  formLoading.value = true
  try {
    const res = await loginApi(data)
    console.log(res)
    token.value = res.token
    refreshToken.value = res.refreshToken
    if (isRemember.value) {
      saveRemember(data.username, data.password)
    }
    router.push('/')
  }
  finally {
    formLoading.value = false
  }
}

function setRemember() {
  const remember = localStorage.getItem(rememberKey)
  if (remember === rememberValueTrue) {
    form.username = deCode(localStorage.getItem(rememberUsernameKey) || '')
    form.password = deCode(localStorage.getItem(rememberPasswordKey) || '')
    isRemember.value = true
  }
}

function saveRemember(username: string, password: string) {
  localStorage.setItem(rememberKey, rememberValueTrue)
  localStorage.setItem(rememberUsernameKey, enCode(username))
  localStorage.setItem(rememberPasswordKey, enCode(password))
}

function clearRemember() {
  localStorage.removeItem(rememberKey)
  localStorage.removeItem(rememberUsernameKey)
  localStorage.removeItem(rememberPasswordKey)
}
</script>

<template>
  <div class="relative bg-login">
    <div class="min-h-[80vh] w-screen flex flex-col items-center justify-center py-10">
      <div class="space-y-4">
        <div class="text-center text-4xl text-white">
          Pure Admin
        </div>
        <div class="w-80 border rounded-xl bg-white/80 p-4 shadow transition-all hover:shadow-2xl">
          <a-form :model="form" :rules="rules" @finish="onFinish">
            <a-form-item name="username">
              <a-input
                v-model:value="form.username"
                :disabled="formLoading"
                size="large"
                allow-clear
                placeholder="请输入用户名"
              >
                <template #prefix>
                  <UserOutlined style="color: #D9D9D9;" />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input-password
                v-model:value="form.password"
                :disabled="formLoading"
                size="large"
                allow-clear
                placeholder="请输入密码"
              >
                <template #prefix>
                  <LockOutlined style="color: #D9D9D9;" />
                </template>
              </a-input-password>
            </a-form-item>
            <div class="mb-4 flex flex-row justify-between">
              <a-checkbox
                v-model:checked="isRemember"
                :disabled="formLoading"
                size="large"
                class="cursor-pointer select-none"
                @change="onRememberChange"
              >
                记住我
              </a-checkbox>
              <a-typography-link
                class="cursor-pointer select-none"
                @click="onForgot"
              >
                忘记密码
              </a-typography-link>
            </div>
            <a-form-item>
              <a-button
                type="primary"
                html-type="submit"
                :loading="formLoading"
                size="large"
                block
              >
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
