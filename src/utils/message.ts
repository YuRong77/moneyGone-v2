import { ElMessage } from 'element-plus'

type MessageType = 'success' | 'warning' | 'info' | 'error'

export const showMessage = (message: string, type: MessageType = 'success') => {
  ElMessage({
    message,
    type,
    plain: true,
    duration: 2500
  })
}
