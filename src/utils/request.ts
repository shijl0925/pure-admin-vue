import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import { message } from 'ant-design-vue'
import Axios from 'axios'
import { storeToRefs } from 'pinia'

import { refreshTokenApi } from '@/apis/user'
import { i18n } from '@/locales'
import { useAppStore } from '@/stores/appStore'
import { useUserStore } from '@/stores/userStore'

export const request = Axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL,
  timeout: 1000 * 30,
})

interface FailedRequest {
  resolve: (value: any) => void
  reject: (error: any) => void
  config: InternalAxiosRequestConfig
}

// 是否正在刷新token
let isRefreshing = false
// 定义一个队列，用于存储失败的请求
let failedQueue: FailedRequest[] = []

// 处理队列中的请求
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) {
      reject(error)
    }
    else {
      // 用新 token 更新请求头
      config.headers.authorization = `Bearer ${token}`
      // 重新发送请求并 resolve 结果
      request(config)
        .then(response => resolve(response.data))
        .catch(err => reject(err))
    }
  })

  // 清空队列（无论成功或失败）
  failedQueue = []
}

// 刷新token函数
async function refreshToken() {
  const userStore = useUserStore()
  const { accessToken, refreshToken } = storeToRefs(userStore)
  try {
    const response = await refreshTokenApi(refreshToken.value)
    accessToken.value = response.accessToken
    refreshToken.value = response.refreshToken

    return response.accessToken // 返回新的 accessToken
  }
  catch (error) {
    // 清除本地存储的 token
    userStore.clearAllToken()

    throw error // 抛出错误
  }
}

request.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userStore = useUserStore()
  const { accessToken, refreshToken } = storeToRefs(userStore)

  const appStore = useAppStore()
  const { currentLocale } = storeToRefs(appStore)

  config.headers['x-lang'] = currentLocale.value

  if (config.url !== '/user/login') {
    config.headers.authorization = `Bearer ${accessToken.value}`
  }

  if (config.url === '/user/refresh') {
    config.headers.authorization = `Bearer ${refreshToken.value}`
  }

  return config
}, error => Promise.reject(error))

request.interceptors.response.use(
  (config: AxiosResponse) => {
    const { data } = config
    if (data.code >= 200 && data.code < 300) {
      return data.data
    }
    else {
      message.error(data.message)

      return Promise.reject(data)
    }
  },
  async (error) => {
    const userStore = useUserStore()
    const { logout } = userStore
    const appStore = useAppStore()
    const { currentLocale } = storeToRefs(appStore)

    if (!error.response) {
      message.error(i18n.global.t('common.networkError'))
      logout()
      return Promise.reject(error)
    }

    const originalRequest = error.config
    const isRefreshRequest = originalRequest.url?.includes('/user/refresh')

    // 如果是刷新token的请求返回401，直接登出
    if (error.response.status === 401 && isRefreshRequest) {
      logout()
      return Promise.reject(error)
    }

    // originalRequest._retry 是一个自定义属性，用于标记请求是否已经重试过。
    // 1、判断是不是 token 过期
    if (error.response.status === 401) {
      if (!originalRequest._retry) {
        originalRequest._retry = true // 显式标记请求为重试
        // 2、并且不是重新获取 token 的 401，则进行 token 刷新
        if (!isRefreshing) {
          // 重新请求accessToken
          try {
            const newAccessToken = await refreshToken()
            // 配置请求头
            originalRequest.headers['x-lang'] = currentLocale.value
            originalRequest.headers.authorization = `Bearer ${newAccessToken}`
            // 处理队列中的其他请求
            processQueue(null, newAccessToken)
            // 重新发起失败的请求
            return request(originalRequest)
          }
          catch (err) {
            // 处理队列中的请求
            processQueue(err, null)
            logout()
            return Promise.reject(err)
          }
          finally {
            isRefreshing = false
          }
        }
      }
      else {
        // 如果正在刷新token,则将请求加入队列
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve,
            reject,
            config: error.config, // 存储原始请求配置
          })
        })
      }
    }

    const errMsg = error.response?.data?.data?.message || error.message
    message.error(errMsg)

    return Promise.reject(error)
  },
)
