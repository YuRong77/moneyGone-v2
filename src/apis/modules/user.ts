import apiClient from '../axios'

export default {
  async getProfile() {
    const result = await apiClient.get('/user')
    return result.data
  }
}
