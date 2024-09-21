import mitt from 'mitt'
import type { Transaction } from '@/types'

type Events = {
  newTransaction: number
  editTransaction: Transaction
  refresh: void
  closeDialog: void
}

export const emitter = mitt<Events>()
