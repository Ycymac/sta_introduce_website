import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { userRefreshToken } from '@/api/user'

export const useUserStore = defineStore(
  'userStore',
  () => {
    const authorization = ref('')
    const refreshToken = ref('')
    const isLoggedIn = computed(() => Boolean(authorization.value && refreshToken.value))

    const setTokens = (payload = {}) => {
      authorization.value = payload.authorization || ''
      refreshToken.value = payload.refreshToken || ''
    }

    const clearSession = () => setTokens()

    const refresh = async () => {
      try {
        const response = await userRefreshToken()
        if (response.data.code !== 200 || !response.data.data) return false
        setTokens(response.data.data)
        return true
      } catch (error) {
        return false
      }
    }

    return { authorization, refreshToken, isLoggedIn, setTokens, clearSession, refresh }
  },
  { persist: true }
)
