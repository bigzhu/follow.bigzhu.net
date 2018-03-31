export default function (key) {
  let cookie = window.document.cookie.indexOf(key + '=')
  if (cookie === -1) return false
  else return true
}
