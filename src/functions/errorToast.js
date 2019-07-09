// 错误处理
import errorCallback from '../functions/errorCallback'
import toast from './toast'

function warning(message) {
  toast(message, 'warning')
}
export default function() {
  errorCallback(warning)
}
