import axios from 'axios'

// 默认的 axios
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.response.use((response) => {
  const { code, data, message } = response.data
  if (code === 200) return data
  return Promise.reject(new Error(message))
})

/**
 * imgApi axios -> 真人 | 风景 | 动漫 | Cos API
 * 图片来源：https://imgapi.cn/wiki.html
 */
export const imgApiService = axios.create({
  baseURL: '/imgapi'
})
imgApiService.interceptors.response.use((response) => {
  return response.data
})

/**
 * likepoemsAPi -> 毒鸡汤
 * 来源：https://api.likepoems.com/
 */
export const likepoemsService = axios.create({
  baseURL: '/likepoems'
})
likepoemsService.interceptors.response.use((response) => {
  return response.data
})

export default service
