<template>
  <main id="main-content" class="portal-page recruitment-view">
    <section class="portal-sheet recruitment-sheet" aria-labelledby="recruitment-title">
      <div class="portal-sheet__folio"><span>RECRUITMENT / {{ currentYear }}</span><span>STATUS FILE</span></div>
      <header class="recruitment-hero">
        <div><p class="record-label">STA / JOIN US</p><h1 id="recruitment-title">欢迎加入<br />软件科技协会</h1></div>
        <div class="recruitment-hero__action">
          <span class="status-chip" :data-tone="uiState.tone">{{ registerInfo.message || '未报名' }}</span>
          <p>{{ campaign.pendingLabel }}</p>
          <button v-if="uiState.action" class="archive-submit" type="button" @click="openApplication"><span>{{ uiState.action }}</span><span aria-hidden="true">↗</span></button>
        </div>
      </header>
      <section class="progress-file" aria-labelledby="progress-heading">
        <div class="section-mini-heading"><p class="record-label">01 / PROGRESS</p><h2 id="progress-heading">报名进度</h2></div>
        <ol class="progress-file__steps">
          <li v-for="(stage, index) in stages" :key="stage" :class="{ 'is-complete': index < uiState.progress, 'is-current': index === uiState.progress }"><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ stage }}</strong></li>
        </ol>
      </section>
      <section class="requirements-file" aria-labelledby="requirements-heading">
        <div class="section-mini-heading"><p class="record-label">02 / REQUIREMENTS</p><h2 id="requirements-heading">面试要求</h2></div>
        <div class="requirements-file__grid">
          <article v-for="item in requirements" :key="item.code"><span>{{ item.code }}</span><h3>{{ item.title }}</h3><p>{{ item.detail }}</p></article>
        </div>
        <div class="interview-place"><span>INTERVIEW PLACE</span><strong>{{ contact.interviewLocation }}</strong></div>
      </section>
      <ContactSection anchor-id="recruitment-contact" />
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ContactSection from '@/components/ContactSection.vue'
import { applyGetInfo } from '@/api/apply'
import { useRecruitmentStore } from '@/stores'
import { recruitmentCampaign, recruitmentContact, recruitmentRequirements, recruitmentStages } from '@/data/recruitment'
import { useNotice } from '@/utils/notice'

export default defineComponent({
  name: 'RecruitmentView',
  components: { ContactSection },
  setup() {
    const router = useRouter()
    const store = useRecruitmentStore()
    const { registerInfo, uiState } = storeToRefs(store)
    const { showNotice } = useNotice()
    const currentYear = computed(() => new Date().getFullYear())
    const loadInfo = async () => {
      try {
        const response = await applyGetInfo()
        store.setRegisterInfo(response.data.data || { status: 0, message: '未报名' })
      } catch (error) { showNotice(error.response?.data?.message || '获取报名信息失败，请稍后再试', 'error') }
    }
    const openApplication = () => router.push('/registerTable')
    onMounted(loadInfo)
    return { currentYear, registerInfo, uiState, campaign: recruitmentCampaign, contact: recruitmentContact, requirements: recruitmentRequirements, stages: recruitmentStages, openApplication }
  }
})
</script>
