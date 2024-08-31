import apiClient from '../axios'

export default {
  async getProfile() {
    const result = await apiClient.get('/user')
    return result.data
  },
  async updateUser(data: { name?: string; lang?: string; theme?: string; monthlyBudget?: number }) {
    const result = await apiClient.put('/user', data)
    return result.data
  }
}
