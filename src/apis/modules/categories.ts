import apiClient from '../axios'

export default {
  async categoryCreate(data: { name: string }) {
    const result = await apiClient.post('/categories', data)
    return result.data
  },
  async categoryUpdate(categoryId: number, data: { name: string }) {
    const result = await apiClient.put(`/categories/${categoryId}`, data)
    return result.data
  },
  async categoryDelete(categoryId: number) {
    const result = await apiClient.delete(`/categories/${categoryId}`)
    return result.data
  },
  async categoryList() {
    const result = await apiClient.get('/categories')
    return result.data
  },
  async shortcutCreate(shortcutId: number, data: { name: string }) {
    const result = await apiClient.post(`/categories/${shortcutId}/shortcuts`, data)
    return result.data
  },
  async shortcutDelete(data: { categoryId: number; shortcutId: number }) {
    const result = await apiClient.delete(
      `/categories/${data.categoryId}/shortcuts/${data.shortcutId}`
    )
    return result.data
  },
  async shortcutList(categoryId: number) {
    const result = await apiClient.get(`/categories/${categoryId}`)
    return result.data
  }
}
