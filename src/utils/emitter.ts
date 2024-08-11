import mitt from 'mitt'

type Events = {
  test: string
}

export const emitter = mitt<Events>()
