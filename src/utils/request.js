import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

service.interceptors.response.use((response) => {
  const { code, data, message } = response.data
  if (code === 200) return data
  return Promise.reject(new Error(message))
})

export default service
