import axios from 'axios'
import { useUserStore } from '@/stores'

const baseURL = process.env.VUE_APP_API_BASE_URL || '/'

const request = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

request.interceptors.request.use((config) => {
  if (config.url.includes('/user/passwordLogin')) return config

  const userStore = useUserStore()
  if (config.url.includes('/user/refreshToken') && userStore.refreshToken) {
    config.headers.refreshToken = userStore.refreshToken
  }
  if (userStore.authorization) {
    config.headers.Authorization = userStore.authorization
  }
  return config
})

export default request
export { baseURL }
