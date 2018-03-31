export default function(callBack) {
  window.addEventListener('unhandledrejection', function(error, promise) {
    console.log('unhandledrejection')
    callBack(error.reason.message)
  })
  window.addEventListener('error', function(error) {
    callBack(error.message)
  })
  // window.onerror = function(message, source, lineno, colno, error) {
  //   callBack(message)
  //   return false
  // }
}
