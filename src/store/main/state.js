export default {
  showHeader: true, // 默认显示header
  showRight: true, // 默认显示右边菜单
  showLeft: false, // 显示左边菜单
  hideParams: { // 为了 scroll 效率, 只部分显示 messages
    paddingTop: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
  }
}
