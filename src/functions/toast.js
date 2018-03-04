// 统一提示框
import {
  Toast
} from 'quasar'
let toast_conf = {
    // html: message,
    // icon: icon,
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
  }

export default function(message, icon) {
  toast_conf.html = message
  toast_conf.icon = icon
  Toast.create(toast_conf)
}
