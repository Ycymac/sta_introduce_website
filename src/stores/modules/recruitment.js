import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { getRecruitmentUiState } from '@/data/recruitment'

export const useRecruitmentStore = defineStore(
  'recruitmentStore',
  () => {
    const registerInfo = ref({ status: 0, message: '未报名' })
    const setRegisterInfo = (value) => {
      registerInfo.value = value || { status: 0, message: '未报名' }
    }
    const reset = () => setRegisterInfo()
    const uiState = computed(() => getRecruitmentUiState(registerInfo.value))

    return { registerInfo, uiState, setRegisterInfo, reset }
  },
  { persist: true }
)
