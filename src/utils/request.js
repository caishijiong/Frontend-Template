import axios from 'axios'
import { Message } from 'element-ui'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.development.VUE_APP_BASE_API || '',
  timeout: 15000,
})

// 请求拦截：注入 token
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error),
)

// 响应拦截：统一错误处理
service.interceptors.response.use(
  response => {
    const { code, msg, data } = response.data
    if (code === 0 || code === 200) {
      return data !== undefined ? data : response.data
    }
    Message.error(msg || '请求失败')
    return Promise.reject(new Error(msg || '请求失败'))
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          Message.error('登录已过期，请重新登录')
          localStorage.removeItem('token')
          router.replace('/login')
          break
        case 403:
          Message.error('没有权限')
          break
        case 500:
          Message.error('服务器错误')
          break
        default:
          Message.error(error.response.data?.message || error.message)
      }
    } else {
      Message.error('网络异常，请检查连接')
    }
    return Promise.reject(error)
  },
)

export default service
