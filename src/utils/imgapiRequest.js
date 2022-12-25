import axios from 'axios'

// 图片来源：https://imgapi.cn/wiki.html
const service = axios.create({
  baseURL: '/imgapi'
})

service.interceptors.response.use((response) => {
  return response.data
})

export default service
