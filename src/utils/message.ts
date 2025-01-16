import { ElMessage } from 'element-plus'

type MessageType = 'success' | 'warning' | 'info' | 'error'

export const showMessage = (message: string, type: MessageType = 'success') => {
  const instance = ElMessage({
    message,
    type,
    plain: true,
    duration: 2500,
    grouping: true
  })

  //router push duration 失效
  setTimeout(() => {
    if (instance) instance.close()
  }, 2500)
}
