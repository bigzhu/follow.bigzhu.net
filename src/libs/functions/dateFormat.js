// 日期格式化
import preZero from './preZero'
export default function (timestamp, mask) {
  if (!timestamp) return ''
  var date, matched_array, o, regStr, res
  let timestamp_standard = (typeof timestamp === 'string') ? timestamp.replace(/-/g, '/') : timestamp
  date = new Date(timestamp_standard)
  o = {
    'y+': function (len) {
      return preZero(date.getFullYear(), len)
    },
    'Y+': function (len) {
      return preZero(date.getFullYear(), len)
    },
    'M+': function (len) {
      return preZero(date.getMonth() + 1, len)
    },
    'd+': function (len) {
      return preZero(date.getDate(), len)
    },
    'h+': function (len) {
      return preZero(date.getHours(), len)
    },
    'm+': function (len) {
      return preZero(date.getMinutes(), len)
    },
    's+': function (len) {
      return preZero(date.getSeconds(), len)
    }
  }
  for (regStr in o) {
    matched_array = mask.match(new RegExp(regStr))
    if (matched_array) {
      res = o[regStr](matched_array[0].length)
      mask = mask.replace(matched_array[0], res)
    }
  }
  return mask
}
