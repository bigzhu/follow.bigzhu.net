// 在数字前加0，用于格式化日期
export default function (num, len) {
  var a, numStr
  numStr = num.toString()
  if (len < numStr.length) {
    return numStr
  } else {
    a = new Array(len + 1).join('0') + numStr
    return a.substr(a.length - len, a.length - 1)
  }
}
