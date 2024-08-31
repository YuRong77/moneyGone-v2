export interface Category {
  id: number
  name: string
  color: string
  imageUrl: string
  shortcuts?: Shortcut[]
}

export interface Shortcut {
  id: number
  name: string
}

export interface TransactionTotal {
  date: string
  details: Transaction[]
  totalAmount: number
}
export interface Transaction {
  id: number
  name: string
  amount: number
  note: string
  categoryId: number
  categoryName: string
  categoryColor: string
  imageUrl: string
  createdAt: string
}

export interface NewTransaction {
  name: string
  amount: number | null
  note: string
  categoryId: number
}

export interface Chart {
  timePeriodTotal: { date: string; totalAmount: number }[]
  categoriesTotal: { id: number; name: string; totalAmount: number }[]
  categoriesDetails: { id: number; name: string; data: number[] }[]
  topExpense: Transaction[]
}

export interface Overview {
  monthlyTotal: number
  dailyTotal: number
  monthlyBudget: number
  todayRecords: Transaction[]
}

export interface User {
  userName: string
  email: string
  lang: string
  theme: string
  monthlyBudget: number
}
