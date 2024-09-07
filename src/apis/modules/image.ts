import apiClient from '../axios'

export default {
  async getImages() {
    const result = await apiClient.get('/image')
    return result.data
  },
  async imageDelete(imageId: number) {
    const result = await apiClient.delete(`/image/${imageId}`)
    return result.data
  }
}
