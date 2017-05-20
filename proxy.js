module.exports = {
  '/api_': {
    target: 'http://follow.center',
    changeOrigin: true
  },
  '/web_socket': {
    target: 'wss://follow.center',
    wss: true,
    changeOrigin: true
  },
  '/static/uploaded_files/': {
    target: 'http://follow.center',
    changeOrigin: true
  }
}
