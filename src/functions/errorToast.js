// 错误处理
import errorCallback from 'bz-q-lib/functions/errorCallback'
import toast from './toast'

function warning(message) {
  toast(message, 'warning')
}
export default function() {
  errorCallback(warning)
}
