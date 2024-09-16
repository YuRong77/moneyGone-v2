import apiClient from '../axios'

export default {
  async login(data: { email: string; password: string }) {
    const result = await apiClient.post('/auth/login', data)
    return result.data
  },
  async register(data: { userName: string; email: string; password: string }) {
    const result = await apiClient.post('/auth/register', data)
    return result.data
  },
  async sendResetEmail(data: { email: string }) {
    const result = await apiClient.post('/auth/forgot-password', data)
    return result.data
  },
  async resetPassword(data: { password: string; token: string }) {
    const result = await apiClient.post('/auth/reset-password', data)
    return result.data
  }
}
