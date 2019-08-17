export default (key, value) => {
  if (typeof Storage !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    // do nothing
  }
}
