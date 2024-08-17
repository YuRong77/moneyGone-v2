import mitt from 'mitt'
import type { Transaction } from '@/types'

type Events = {
  newTransaction: number
  editTransaction: Transaction
  refresh: void
}

export const emitter = mitt<Events>()
