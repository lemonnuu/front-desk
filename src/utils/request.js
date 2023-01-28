import axios from 'axios'

// 默认的 axios
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API
  // timeout: 10000
})

service.interceptors.response.use((response) => {
  const { status, data } = response
  if (status === 200) return data
  return Promise.reject(new Error(data))
})

export default service
