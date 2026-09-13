<template>
  <main id="main-content" class="portal-page account-view">
    <section class="portal-sheet account-sheet" aria-labelledby="account-title">
      <div class="portal-sheet__folio"><span>MEMBER ACCESS</span><span>01—03</span></div>
      <div class="account-sheet__intro">
        <p class="record-label">STA / ACCOUNT</p>
        <transition name="account-swap" mode="out-in">
          <h1 id="account-title" :key="mode">{{ modeTitle }}</h1>
        </transition>
        <transition name="account-swap" mode="out-in">
          <p :key="mode">{{ modeDescription }}</p>
        </transition>
      </div>
      <form class="archive-form" novalidate @submit.prevent="submit">
        <label class="archive-field"><span>邮箱 / EMAIL</span><input v-model.trim="email" type="email" autocomplete="email" placeholder="name@example.com" :disabled="submitting" required /></label>
        <transition name="account-field">
          <label v-if="mode !== 'login'" class="archive-field archive-field--code">
            <span>验证码 / CODE</span>
            <span class="archive-field__inline"><input v-model.trim="code" type="text" inputmode="numeric" autocomplete="one-time-code" placeholder="邮箱验证码" :disabled="submitting" required /><button type="button" :disabled="codeDisabled || submitting" @click="sendCode">{{ codeButton }}</button></span>
          </label>
        </transition>
        <label class="archive-field"><span>{{ mode === 'reset' ? '新密码' : '密码' }} / PASSWORD</span>
          <span class="archive-field__reveal"><input v-model="password" :type="showPassword ? 'text' : 'password'" :autocomplete="mode === 'login' ? 'current-password' : 'new-password'" placeholder="8–20 位，包含字母和数字" maxlength="20" :disabled="submitting" required /><button type="button" class="pw-toggle" :aria-pressed="showPassword" :aria-label="showPassword ? '隐藏密码' : '显示密码'" :disabled="submitting" @click="showPassword = !showPassword"><svg v-if="showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/></svg><svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button></span>
        </label>
        <transition name="account-field">
          <label v-if="mode !== 'login'" class="archive-field"><span>确认密码 / REPEAT</span>
            <span class="archive-field__reveal"><input v-model="repeatPassword" :type="showRepeat ? 'text' : 'password'" autocomplete="new-password" placeholder="再次输入密码" maxlength="20" :disabled="submitting" required /><button type="button" class="pw-toggle" :aria-pressed="showRepeat" :aria-label="showRepeat ? '隐藏密码' : '显示密码'" :disabled="submitting" @click="showRepeat = !showRepeat"><svg v-if="showRepeat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C5 20 1 12 1 12a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="m1 1 22 22"/><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/></svg><svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button></span>
          </label>
        </transition>
        <button class="archive-submit" type="submit" :disabled="submitting"><span>{{ submitting ? '处理中…' : submitLabel }}</span><span aria-hidden="true">↗</span></button>
      </form>
      <div class="account-sheet__switches" aria-label="账户操作">
        <button v-if="mode === 'login'" type="button" @click="changeMode('reset')">忘记密码</button>
        <button type="button" @click="changeMode(mode === 'login' ? 'register' : 'login')">{{ mode === 'login' ? '注册账号' : '返回登录' }}</button>
      </div>
    </section>
  </main>
</template>

<script>
import { computed, defineComponent, onBeforeUnmount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { userChangePassword, userLogin, userRegister, userSendRegisterSmsCode, userSendSmsCode } from '@/api/user'
import { useNotice } from '@/utils/notice'

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,20}$/

export default defineComponent({
  name: 'AccountView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const { showNotice } = useNotice()
    const mode = ref('login')
    const email = ref('')
    const code = ref('')
    const password = ref('')
    const repeatPassword = ref('')
    const showPassword = ref(false)
    const showRepeat = ref(false)
    const submitting = ref(false)
    const secondsLeft = ref(0)
    let codeTimer = null
    const modeTitle = computed(() => ({ login: '登录', register: '注册', reset: '重置密码' }[mode.value]))
    const submitLabel = computed(() => ({ login: '登录', register: '创建账号', reset: '确认修改' }[mode.value]))
    const modeDescription = computed(() => ({ login: '使用邮箱与密码进入报名系统。', register: '验证邮箱，建立你的 STA 报名账号。', reset: '通过邮箱验证码设置新的登录密码。' }[mode.value]))
    const codeDisabled = computed(() => secondsLeft.value > 0)
    const codeButton = computed(() => secondsLeft.value > 0 ? `${secondsLeft.value} 秒` : '获取验证码')
    const clearSensitiveFields = () => { code.value = ''; password.value = ''; repeatPassword.value = ''; showPassword.value = false; showRepeat.value = false }
    const changeMode = (nextMode) => { mode.value = nextMode; clearSensitiveFields() }
    const validate = () => {
      if (!email.value) return '邮箱不能为空'
      if (!emailPattern.test(email.value)) return '邮箱格式错误'
      if (mode.value !== 'login' && !code.value) return '验证码不能为空'
      if (!password.value) return '密码不能为空'
      if (!passwordPattern.test(password.value)) return '密码需为 8–20 位，并同时包含字母和数字'
      if (mode.value !== 'login' && password.value !== repeatPassword.value) return '两次密码输入不一致'
      return ''
    }
    const sendCode = async () => {
      if (!email.value || !emailPattern.test(email.value)) { showNotice(!email.value ? '邮箱不能为空' : '邮箱格式错误', 'error'); return }
      try {
        const response = mode.value === 'reset' ? await userSendSmsCode(email.value) : await userSendRegisterSmsCode(email.value)
        if (response.data.code !== 200) { showNotice(response.data.message || '验证码发送失败', 'error'); return }
        showNotice('验证码已发送，请同时检查垃圾箱', 'success', 5000)
        secondsLeft.value = 60
        codeTimer = window.setInterval(() => {
          secondsLeft.value -= 1
          if (secondsLeft.value <= 0) { window.clearInterval(codeTimer); codeTimer = null }
        }, 1000)
      } catch (error) { showNotice(error.response?.data?.message || '验证码发送失败，请稍后再试', 'error') }
    }
    const submit = async () => {
      if (submitting.value) return
      const message = validate()
      if (message) { showNotice(message, 'error'); return }
      submitting.value = true
      try {
        if (mode.value === 'login') {
          const response = await userLogin(email.value, password.value)
          if (response.data.code !== 200) { showNotice(response.data.message || '登录失败', 'error'); password.value = ''; return }
          userStore.setTokens(response.data.data)
          showNotice('登录成功', 'success')
          await router.push('/')
        } else if (mode.value === 'register') {
          const response = await userRegister(email.value, code.value, password.value)
          if (response.status !== 200) throw new Error('register_failed')
          showNotice(response.data.message || '注册成功', 'success'); changeMode('login')
        } else {
          const response = await userChangePassword(email.value, code.value, password.value)
          if (response.status !== 200) throw new Error('reset_failed')
          showNotice(response.data.message || '密码修改成功', 'success'); changeMode('login')
        }
      } catch (error) { showNotice(error.response?.data?.message || (mode.value === 'login' ? '登录失败，请再次尝试' : '操作失败，请稍后再试'), 'error') }
      finally { submitting.value = false }
    }
    onBeforeUnmount(() => { if (codeTimer) window.clearInterval(codeTimer) })
    return { mode, email, code, password, repeatPassword, showPassword, showRepeat, submitting, modeTitle, submitLabel, modeDescription, codeDisabled, codeButton, changeMode, sendCode, submit }
  }
})
</script>
