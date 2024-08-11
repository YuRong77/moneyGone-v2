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

export interface NewTransaction {
  name: string
  amount: number | null
  note: string
  categoryId: number
}
