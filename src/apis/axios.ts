import axios from 'axios'
import { router } from '@/router'
import { showMessage } from '@/utils/message'
import { authAPI } from '.'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
})

let isRefreshing = false
let currentRefreshingCall: any = null
async function refreshToken() {
  if (isRefreshing) return currentRefreshingCall
  isRefreshing = true
  try {
    currentRefreshingCall = authAPI.refreshToken()
    const token = await currentRefreshingCall
    localStorage.setItem('token', token)
    apiClient.defaults.headers.Authorization = `Bearer ${token}`
    return Promise.resolve()
  } catch {
    return Promise.reject()
  } finally {
    isRefreshing = false
    currentRefreshingCall = null
  }
}

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  async (error) => {
    console.log(error, 'error')
    if (!error.response) return Promise.reject(error)
    const originalRequest = error.config
    const { status, data } = error.response

    if (status === 401 && data.errorCode === 'TOKEN_EXPIRED') {
      await refreshToken()
      return apiClient(originalRequest)
    }
    if (status === 403) {
      router.push({ name: 'Login' })
    }
    showMessage(data.message, 'error')
    return Promise.reject(data)
  }
)

export default apiClient
