<template>
  <main id="main-content" class="portal-page application-view">
    <section class="portal-sheet application-sheet" aria-labelledby="application-title">
      <div class="portal-sheet__folio"><span>APPLICATION / FORM</span><span>{{ modeCode }}</span></div>
      <header class="application-sheet__header">
        <div><p class="record-label">STA / RECRUITMENT</p><h1 id="application-title">{{ title }}</h1></div>
        <button type="button" @click="router.push('/register')">返回进度</button>
      </header>
      <form class="application-form" @submit.prevent="submit">
        <label class="archive-field"><span>学号 / NUMBER</span><input v-model.trim="number" type="text" :disabled="identityLocked || submitting" required /></label>
        <label class="archive-field"><span>姓名 / NAME</span><input v-model.trim="name" type="text" autocomplete="name" :disabled="identityLocked || submitting" required /></label>
        <label class="archive-field"><span>专业班级 / MAJOR & CLASS</span><input v-model.trim="majorClass" type="text" :disabled="identityLocked || submitting" required /></label>
        <label class="archive-field"><span>手机号 / TELEPHONE</span><input v-model.trim="telephone" type="tel" inputmode="tel" autocomplete="tel" :disabled="identityLocked || submitting" required /></label>
        <label class="archive-field"><span>{{ interviewLabel }} / TIME</span>
          <select v-model="comTime" :disabled="loadingTimes || submitting" required>
            <option v-if="loadingTimes" disabled value="">加载时间中…</option>
            <option v-else-if="!times.length" disabled value="">暂无可选时间</option>
            <option v-for="item in times" :key="item.id" :value="item.id">{{ item.time }}</option>
          </select>
        </label>
        <label v-if="!identityLocked" class="archive-field"><span>意向方向 / DIRECTION</span><select v-model="intention" :disabled="submitting" required><option v-for="item in directions" :key="item" :value="item">{{ item }}</option></select></label>
        <button class="archive-submit application-form__submit" type="submit" :disabled="submitting || loadingTimes || !times.length"><span>{{ submitting ? '提交中…' : '提交' }}</span><span aria-hidden="true">↗</span></button>
      </form>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { applyAdd, applyGetTime, applySecond, applyUpdate } from '@/api/apply'
import { useRecruitmentStore } from '@/stores'
import { recruitmentDirections } from '@/data/recruitment'
import { useNotice } from '@/utils/notice'

const phonePattern = /^1[3-9]\d{9}$/

export default defineComponent({
  name: 'ApplicationFormView',
  setup() {
    const router = useRouter()
    const store = useRecruitmentStore()
    const { showNotice } = useNotice()
    const times = ref([])
    const loadingTimes = ref(true)
    const submitting = ref(false)
    const number = ref(''); const name = ref(''); const majorClass = ref(''); const telephone = ref('')
    const intention = ref(recruitmentDirections[0]); const comTime = ref('')
    const status = computed(() => Number(store.registerInfo.status || 0))
    const identityLocked = computed(() => status.value === 2)
    const title = computed(() => status.value === 2 ? '选择二面时间' : status.value === 1 ? '修改报名信息' : '报名')
    const interviewLabel = computed(() => status.value === 2 ? '二面时间' : '一面时间')
    const modeCode = computed(() => `MODE / 0${Math.min(status.value + 1, 3)}`)
    const initialize = () => {
      if (status.value <= 0) return
      const info = store.registerInfo
      number.value = info.number || ''; name.value = info.name || ''; majorClass.value = info.majorClass || ''; telephone.value = info.telephone || ''; intention.value = info.intention || recruitmentDirections[0]
      comTime.value = status.value === 2 ? (info.secondTime || '') : (info.firstTime || '')
    }
    const loadTimes = async () => {
      loadingTimes.value = true
      try {
        const response = await applyGetTime(status.value === 2 ? 2 : 1)
        times.value = Array.isArray(response.data.data) ? response.data.data : []
        initialize()
        if (!comTime.value && times.value.length) comTime.value = times.value[0].id
      } catch (error) { showNotice(error.response?.data?.message || '获取面试时间失败', 'error') }
      finally { loadingTimes.value = false }
    }
    const submit = async () => {
      if (submitting.value) return
      if (!comTime.value) { showNotice('请选择面试时间', 'error'); return }
      if (!identityLocked.value && (!number.value || !name.value || !majorClass.value || !telephone.value)) { showNotice('请完整填写报名信息', 'error'); return }
      if (!identityLocked.value && !phonePattern.test(telephone.value)) { showNotice('手机号格式不正确', 'error'); return }
      submitting.value = true
      try {
        let response
        if (status.value === 2) response = await applySecond(comTime.value)
        else if (status.value === 1) response = await applyUpdate(number.value, name.value, majorClass.value, telephone.value, comTime.value, intention.value)
        else response = await applyAdd(number.value, name.value, majorClass.value, telephone.value, comTime.value, intention.value)
        if (response.data.code !== 200) { showNotice(response.data.message || '提交失败', 'error'); return }
        showNotice(status.value === 2 ? '选择二面时间成功' : status.value === 1 ? '修改报名信息成功' : '报名成功', 'success')
        await router.push('/register')
      } catch (error) { showNotice(error.response?.data?.message || '提交失败，请再次尝试', 'error') }
      finally { submitting.value = false }
    }
    onMounted(loadTimes)
    return { router, times, loadingTimes, submitting, number, name, majorClass, telephone, intention, comTime, directions: recruitmentDirections, identityLocked, title, interviewLabel, modeCode, submit }
  }
})
</script>
