import apiClient from '../axios'

export default {
  async transactionCreate(data: {
    categoryId: number
    name: string
    amount: number
    note: string
  }) {
    const result = await apiClient.post('/transactions', data)
    return result.data
  },
  async transactionUpdate(
    transactionId: number,
    data: { name: string; amount: number; note: string }
  ) {
    const result = await apiClient.put(`/transactions/${transactionId}`, data)
    return result.data
  },
  async transactionDelete(transactionId: number) {
    const result = await apiClient.delete(`/transactions/${transactionId}`)
    return result.data
  },
  async transactionOverview() {
    const result = await apiClient.get('/transactions/overview')
    return result.data
  },
  async transactionTotalList(data: { startDate: string; endDate: string }) {
    const result = await apiClient.get('/transactions/total', { params: data })
    return result.data
  },
  async transactionList(data: {
    startDate: string
    endDate: string
    categoryId?: number
    page?: number
    limit?: number
    orderByAmount?: boolean
  }) {
    const result = await apiClient.get('/transactions', { params: data })
    return result.data
  }
}
