export default {
  show_header: true, // 默认显示header
  show_right: true, // 默认显示右边菜单
  show_left: false, // 显示左边菜单
  hide_params: { // 为了 scroll 效率, 只部分显示 messages
    padding_top: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
  }
}
