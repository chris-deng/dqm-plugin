import axios from 'axios'

const headers = {
  'Content-Type': 'application/json',
}

const Request = axios.create({
  headers: { ...headers },
  timeout: 10000, // 10s超时
})

const callApi = async (payload) => {
  return await Request.request({
    url: payload.url,
    method: payload.method,
    headers: payload.headers,
    params: payload.params, // get请求参数
    data: payload.data, //  请求体参数
  })
}
export async function getMetricsOverviewData(auth_data, params) {
  const res =
    (await callApi({
      url: '/dqm/api/dqms/metrics',
      method: 'get',
      params,
      headers: { 'X-Auth-Token': auth_data.authToken, 'X-Access-Token': auth_data.accessToken },
    })) || {}
  const data = res.data || {}
  if (res.status === 200) {
    return data
  }
  return {}
}
