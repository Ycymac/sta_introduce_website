// Selected alumni journeys supplied for the public showcase.
// Names are intentionally masked until publication consent is confirmed.

export const alumniJourneyMeta = {
  label: '部分校友去向',
  englishLabel: 'SELECTED JOURNEYS',
  totalRecords: 21
}

const origin = () => ({ type: 'origin', organization: 'STA', label: '出发' })

const stop = (type, organization, label, asset = '') => ({
  type,
  organization,
  label,
  asset
})

const person = (id, publicName, stops) => ({
  id,
  publicName,
  stops: [origin(), ...stops]
})

export const alumniCohorts = [
  {
    id: '2021',
    label: '21级',
    phase: '毕业 / 入职',
    englishPhase: 'GRADUATED / EMPLOYED',
    isPartial: true,
    summary: '从协会出发，进入互联网产品与技术团队。',
    people: [
      person('2021-wei', '尉*', [stop('employment', '字节跳动', '入职', 'bytedance')]),
      person('2021-he', '贺*伟', [stop('employment', '腾讯', '入职', 'tencent')]),
      person('2021-li', '李*国', [stop('employment', '腾讯', '入职', 'tencent')]),
      person('2021-liu', '刘*琛', [stop('employment', '美团', '入职', 'meituan')]),
      person('2021-wang-haoyang', '王*阳', [stop('employment', '美团', '入职', 'meituan')]),
      person('2021-wang-yufei', '王*飞', [stop('employment', '滴滴', '入职', 'didi')])
    ]
  },
  {
    id: '2022',
    label: '22级',
    phase: '毕业 / 去向',
    englishPhase: 'GRADUATED / DESTINATIONS',
    isPartial: true,
    summary: '毕业之后，有人进入企业，也有人继续深造。',
    people: [
      person('2022-chen', '陈*', [stop('employment', '美团', '入职', 'meituan')]),
      person('2022-zhang-tianguo', '张*果', [stop('employment', '字节跳动', '入职', 'bytedance')]),
      person('2022-liu-yuxi', '刘*熙', [stop('employment', '阿里钉钉', '入职', 'dingtalk')]),
      person('2022-li-xinyu', '李*宇', [stop('employment', '哔哩哔哩', '入职', 'bilibili')]),
      person('2022-zhang-ruitong', '张*彤', [stop('postgraduate', '山东大学', '升学')]),
      person('2022-huang-yuxin', '黄*欣', [stop('postgraduate', '西安电子科技大学', '升学')])
    ]
  },
  {
    id: '2023',
    label: '23级',
    phase: '实习经历',
    englishPhase: 'INTERNSHIP RECORDS',
    isPartial: true,
    summary: '把在真实团队里的实践，记录为下一段旅程的起点。',
    people: [
      person('2023-su', '苏*', [
        stop('internship', '美团', '实习', 'meituan'),
        stop('internship', '腾讯', '实习', 'tencent')
      ]),
      person('2023-zhang-xuyang', '张*阳', [
        stop('internship', '美团', '实习', 'meituan'),
        stop('internship', '腾讯', '实习', 'tencent')
      ]),
      person('2023-gao', '高*愿', [
        stop('internship', '蚂蚁', '实习', 'ant'),
        stop('internship', '腾讯', '实习', 'tencent')
      ]),
      person('2023-wang-zixuan', '王*萱', [stop('internship', '腾讯', '实习', 'tencent')]),
      person('2023-wang-lunbo', '王*博', [stop('internship', '字节跳动', '实习', 'bytedance')]),
      person('2023-lei', '雷*华', [stop('internship', '蚂蚁', '实习', 'ant')]),
      person('2023-sun', '孙*月', [
        stop('internship', '小红书', '实习', 'xiaohongshu'),
        stop('internship', '字节跳动', '实习', 'bytedance')
      ]),
      person('2023-wang-zhuoya', '王*雅', [stop('internship', '字节跳动', '实习', 'bytedance')]),
      person('2023-zheng', '郑*玉', [stop('internship', '滴滴', '实习', 'didi')])
    ]
  }
]

export const alumni = alumniCohorts.flatMap((cohort) =>
  cohort.people.map((personRecord) => ({
    ...personRecord,
    cohort: cohort.label,
    cohortId: cohort.id,
    phase: cohort.phase
  }))
)

export const alumniSchema = {
  id: '',
  publicName: '',
  cohort: '',
  phase: '',
  stops: [
    { type: 'origin', organization: 'STA', label: '出发', asset: '' },
    { type: 'internship | offer | employment | postgraduate | public_service', organization: '', label: '', asset: '' }
  ],
  consentConfirmed: false,
  verifiedAt: ''
}
