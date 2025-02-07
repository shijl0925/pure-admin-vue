import type { InternalAxiosRequestConfig } from 'axios'

import { message } from 'ant-design-vue'
import Axios from 'axios'

import { logout } from '@/core/system'
import { useAuthStore } from '@/stores'

export const http = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000 * 300,
})

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const authStore = useAuthStore()

  if (authStore.token)
    config.headers.authorization = `Bearer ${authStore.token}`

  return config
}, error => Promise.reject(error))

http.interceptors.response.use(
  (config) => {
    const { data } = config
    if (data.code >= 200 && data.code < 300) {
      return data.data
    }
    else {
      message.error(data.message)
      if (data.code === 401) {
        logout()
      }

      return Promise.reject(data)
    }
  },
  (error) => {
    const errMsg = error.response?.data?.message || error.message
    console.error(errMsg)

    return Promise.reject(error)
  },
)
