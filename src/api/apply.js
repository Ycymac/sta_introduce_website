import request from '@/utils/request'
import { useUserStore } from '@/stores'

export const applyAdd = (number, name, majorClass, telephone, firstTime, intention) => {
  useUserStore().refresh()
  return request.post('/enroll/add', { number, name, majorClass, telephone, firstTime, intention })
}

export const applyUpdate = (number, name, majorClass, telephone, firstTime, intention) => {
  useUserStore().refresh()
  return request.put('/enroll/update', { number, name, majorClass, telephone, firstTime, intention })
}

export const applyGetInfo = () => {
  useUserStore().refresh()
  return request.get('/enroll/get')
}

export const applySecond = (timeId) => {
  useUserStore().refresh()
  return request.put(`/enroll/selectSecond/${timeId}`)
}

export const applyGetTime = (type) => {
  useUserStore().refresh()
  return request.get(`/interviewTime/get/${type}`)
}
