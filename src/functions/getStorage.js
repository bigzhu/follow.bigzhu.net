export default (key) => {
  if (typeof Storage !== 'undefined') {
    let value = localStorage.getItem(key)
    return JSON.parse(value)
  } else {
    return null
    // do nothing
  }
}
