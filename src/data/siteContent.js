export const association = {
  nameZh: '软件科技协会',
  nameEn: 'Software and Technology Association',
  institution: '计算机学院实验室',
  founded: '2010.04',
  description:
    '软件科技协会是计算机学院开设的实验室，成立于 2010 年 4 月。作为新型的学生课外学习组织，以组织和培训学生参加国内外各种软件类竞赛为主要活动内容，培养学生的软件开发能力，塑造高水平软件人才。'
}

export const values = [
  { en: 'SHARE', zh: '分享' },
  { en: 'OPEN', zh: '开放' },
  { en: 'COMPETITION', zh: '竞争' },
  { en: 'COOPERATION', zh: '协作' },
  { en: 'FRIENDLY', zh: '友爱' },
  { en: 'INTERDEPENDENT', zh: '互助' }
]

export const directions = [
  {
    number: '01',
    name: 'Java 后端',
    label: 'Java 后端方向',
    description: '学习 Java 后端开发基础技术以及常用的数据库、中间件、AI 内容，并进行相关应用项目开发。'
  },
  {
    number: '02',
    name: 'Go 后端',
    label: 'Go 后端方向',
    description: '学习 Go 后端开发基础技术以及常用的数据库、中间件、AI 相关内容，并进行相关应用项目开发。'
  },
  {
    number: '03',
    name: '前端 / 全栈',
    label: '前端 / 全栈方向',
    description: '学习 HTML / CSS / JS 等前端常见技术，也鼓励学习后端相关内容，尝试进行全栈学习，并进行相关应用项目开发。'
  }
]

export const growthPath = [
  {
    term: '大一上',
    english: 'COMMON FOUNDATION',
    summary: '先把共同基础打牢，再进入方向选择。',
    steps: [
      { label: 'C 语言基础', emphasis: false },
      { label: '数据结构', emphasis: true },
      { label: '算法', emphasis: true },
      { label: '阶段性考核', emphasis: false }
    ]
  },
  {
    term: '大一下',
    english: 'SPECIALIZATION',
    summary: '根据兴趣选择方向，在方向内继续学习。',
    steps: [
      { label: '方向选择', emphasis: false },
      { label: '方向学习', emphasis: false },
      { label: '项目实践', emphasis: false }
    ]
  }
]

export const selectionCopy = {
  lead: '重基础，重态度，也重结果。',
  body:
    '软协实行阶段性考核与动态培养机制。我们既关注能力成长，也重视投入程度、学习态度与协作责任。对于长期考核不达标且缺乏认真投入的成员，将终止后续培养。',
  close:
    '我们不以扩大人数为目标，而是寻找愿意长期投入、主动学习，并用行动与作品证明成长的人。'
}
