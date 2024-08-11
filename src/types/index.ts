export interface Category {
  id: number
  name: string
}

export interface Transaction {
  id: number
  name: string
  amount: number
  note: string
  categoryId: number
  categoryName: string
  createdAt: string
}
