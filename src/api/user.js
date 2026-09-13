import request from '@/utils/request'

export const userRegister = (email, code, password) =>
  request.post('/user/register', { email, code, password })

export const userLogin = (email, password) =>
  request.post('/user/passwordLogin', { email, password })

export const userRefreshToken = () => request.post('/user/refreshToken')

export const userChangePassword = (email, code, password) =>
  request.put('/user/changePassword', { email, code, password })

export const userSendSmsCode = (email) =>
  request.post(`/email/password?email=${email}`)

export const userSendRegisterSmsCode = (email) =>
  request.post(`/email/register?email=${email}`)
