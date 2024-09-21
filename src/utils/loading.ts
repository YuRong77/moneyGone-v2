import { ElLoading } from 'element-plus'

const load = () =>
  ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'unset',
    customClass: 'myLoading'
  })

export const loading = {
  open: () => load(),
  close: () => load().close()
}
