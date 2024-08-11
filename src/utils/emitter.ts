import mitt from 'mitt'

type Events = {
  newTransaction: number
  refresh: void
}

export const emitter = mitt<Events>()
