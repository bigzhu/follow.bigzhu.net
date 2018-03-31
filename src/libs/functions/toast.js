// 统一提示框
import {
  Toast
} from 'quasar'

export default function(message, icon) {
  Toast.create({
    html: message,
    icon: icon,
    timeout: 2500,
    color: 'white',
    bgColor: '#54b98f',
    button: {
      label: '',
      // handler() {
      //   // Specify what to do when button is clicked/tapped
      // },
      color: 'white'
    }
  })
}
