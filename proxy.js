module.exports = {
  '/p': {
    target: 'https://follow.center',
    changeOrigin: true
  },
  '/api_': {
    // target: 'http://47.88.137.77:9444',
    target: 'https://follow.center',
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
