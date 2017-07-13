// 错误处理
import errorCallback from 'bz-lib/functions/errorCallback'
import {
  Toast
} from 'quasar'

function create(message) {
  Toast.create({
    html: message,
    icon: 'warning',
    timeout: 2500,
    color: 'white',
    bgColor: '#54b98f',
    button: {
      label: '',
      handler() {
        // Specify what to do when button is clicked/tapped
      },
      color: 'white'
    }
  })
}
export default function() {
  errorCallback(create)
}
