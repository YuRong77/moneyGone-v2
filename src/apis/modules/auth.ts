import apiClient from '../axios'

export default {
  async login(data: { email: string; password: string }) {
    const result = await apiClient.post('/auth/login', data)
    return result.data
  }
}
