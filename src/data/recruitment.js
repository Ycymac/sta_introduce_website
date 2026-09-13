export const recruitmentCampaign = {
  startAt: null,
  endAt: null,
  pendingLabel: '报名时间待公布'
}

export const recruitmentRequirements = [
  { code: '01', title: 'C 语言', detail: '掌握到链表之前' },
  { code: '02', title: '算法', detail: '会基本的排序算法，例如冒泡排序' },
  { code: '03', title: '机试', detail: '能在电脑上完成常规题目' }
]

export const recruitmentContact = {
  location: '长安校区逸夫楼fz129',
  interviewLocation: '长安校区逸夫楼ff106'
}

export const recruitmentDirections = ['前端', 'GO', 'Java']

export const recruitmentStages = ['报名', '一面', '二面', '通过']

export function getRecruitmentUiState(info = {}) {
  const status = Number(info.status || 0)
  const message = info.message || '未报名'

  if (status === 1) {
    return message === '已报名'
      ? { progress: 1, tone: 'process', action: '修改报名信息' }
      : { progress: 1, tone: 'error', action: '' }
  }

  if (status === 2) {
    return message === '一面通过'
      ? { progress: 2, tone: 'process', action: '选择二面时间' }
      : { progress: 2, tone: 'error', action: '' }
  }

  if (status === 3) {
    return { progress: 3, tone: 'success', action: '' }
  }

  return { progress: 0, tone: 'wait', action: '报名' }
}
