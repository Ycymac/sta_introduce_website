const http = require('http')

let enrollment = null

const send = (response, body, status = 200) => {
  response.writeHead(status, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, refreshToken',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
    'Content-Type': 'application/json; charset=utf-8'
  })
  response.end(JSON.stringify(body))
}

const readBody = (request) => new Promise((resolve) => {
  let raw = ''
  request.on('data', (chunk) => { raw += chunk })
  request.on('end', () => resolve(raw ? JSON.parse(raw) : {}))
})

http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') return send(response, {})
  const url = new URL(request.url, 'http://localhost:9090')

  if (request.method === 'POST' && url.pathname === '/user/passwordLogin') {
    const body = await readBody(request)
    const validKeys = Object.keys(body).sort().join(',') === 'email,password'
    return send(response, validKeys
      ? { code: 200, message: '登录成功', data: { authorization: 'qa-authorization', refreshToken: 'qa-refresh' } }
      : { code: 400, message: '登录参数不一致', data: null })
  }
  if (request.method === 'POST' && url.pathname === '/user/refreshToken') {
    return send(response, { code: 200, data: { authorization: 'qa-authorization-next', refreshToken: 'qa-refresh-next' } })
  }
  if (request.method === 'GET' && url.pathname === '/enroll/get') {
    return send(response, { code: 200, data: enrollment })
  }
  if (request.method === 'GET' && url.pathname === '/interviewTime/get/1') {
    return send(response, { code: 200, data: [{ id: 101, time: '9月20日 14:00' }, { id: 102, time: '9月20日 15:00' }] })
  }
  if (request.method === 'GET' && url.pathname === '/interviewTime/get/2') {
    return send(response, { code: 200, data: [{ id: 201, time: '9月27日 14:00' }] })
  }
  if (request.method === 'POST' && url.pathname === '/enroll/add') {
    const body = await readBody(request)
    const expectedKeys = ['firstTime', 'intention', 'majorClass', 'name', 'number', 'telephone']
    const validKeys = JSON.stringify(Object.keys(body).sort()) === JSON.stringify(expectedKeys)
    enrollment = validKeys ? { ...body, status: 1, message: '已报名' } : null
    return send(response, validKeys ? { code: 200, message: '报名成功', data: enrollment } : { code: 400, message: '报名参数不一致' })
  }
  if (request.method === 'PUT' && url.pathname === '/enroll/update') {
    const body = await readBody(request)
    enrollment = { ...body, status: 1, message: '已报名' }
    return send(response, { code: 200, message: '修改成功', data: enrollment })
  }
  if (request.method === 'PUT' && url.pathname.startsWith('/enroll/selectSecond/')) {
    return send(response, { code: 200, message: '选择成功', data: null })
  }
  if ((request.method === 'POST' && url.pathname === '/user/register') || (request.method === 'PUT' && url.pathname === '/user/changePassword')) {
    return send(response, { code: 200, message: '操作成功', data: null })
  }
  if (request.method === 'POST' && (url.pathname === '/email/register' || url.pathname === '/email/password')) {
    return send(response, { code: url.searchParams.has('email') ? 200 : 400, message: '验证码已发送', data: null })
  }
  return send(response, { code: 404, message: 'Not found', data: null }, 404)
}).listen(9090, '127.0.0.1', () => {
  process.stdout.write('portal contract mock listening on http://127.0.0.1:9090\n')
})
