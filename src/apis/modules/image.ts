import apiClient from '../axios'

export default {
  async getImages() {
    const result = await apiClient.get('/image')
    return result.data
  }
}
