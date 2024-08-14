import apiClient from '../axios'
import type { AxiosResponse } from 'axios'
import type { Chart } from '@/types'

export default {
  async getChart(data: { type: string; year: number; month?: number }) {
    const result: AxiosResponse<Chart> = await apiClient.get('/chart', { params: data })
    return result.data
  }
}
