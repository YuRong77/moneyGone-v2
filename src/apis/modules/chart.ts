import apiClient from '../axios'

export default {
  async getChart(data: { type: 'year' | 'month'; year: number; month?: number }) {
    const result = await apiClient.get('/chart', { params: data })
    return result.data
  }
}
