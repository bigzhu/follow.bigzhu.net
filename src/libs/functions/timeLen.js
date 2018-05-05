var second = 1000
var minute = second * 60
var hour = minute * 60
var day = hour * 24
var month = day * 30
var year = month * 12

export default function (time, lang = 'cn') {
  var now = Date.now()
  var interval = now - time
  if (lang === 'en') {
    return enDesc(interval)
  } else {
    return cnDesc(interval)
  }
}

function cnDesc (interval) {
  let desc
  if (interval < minute) {
    desc = parseInt(interval / second, 10) + '秒前'
  } else if (interval < hour) {
    desc = parseInt(interval / minute, 10) + '分钟前'
  } else if (interval < day) {
    desc = parseInt(interval / hour, 10) + '小时前'
  } else if (interval < month) {
    desc = parseInt(interval / day, 10) + '天前'
  } else if (interval < year) {
    desc = parseInt(interval / month, 10) + '个月前'
  } else {
    desc = parseInt(interval / year, 10) + '年前'
  }
  return desc
}

function enDesc (interval) {
  let desc
  let nu = 0
  if (interval < minute) {
    nu = parseInt(interval / second, 10)
    if (nu === 1) {
      desc = nu + ' second ago'
    } else {
      desc = nu + ' seconds ago'
    }
  } else if (interval < hour) {
    nu = parseInt(interval / minute, 10)
    if (nu === 1) {
      desc = nu + ' minute ago'
    } else {
      desc = nu + ' minutes ago'
    }
  } else if (interval < day) {
    nu = parseInt(interval / hour, 10)
    if (nu === 1) {
      desc = nu + ' hour ago'
    } else {
      desc = nu + ' hours ago'
    }
  } else if (interval < month) {
    nu = parseInt(interval / day, 10)
    if (nu === 1) {
      desc = nu + ' day ago'
    } else {
      desc = nu + ' days ago'
    }
  } else if (interval < year) {
    nu = parseInt(interval / month, 10)
    if (nu === 1) {
      desc = nu + ' month ago'
    } else {
      desc = nu + ' months ago'
    }
  } else {
    nu = parseInt(interval / year, 10)
    if (nu === 1) {
      desc = nu + ' year ago'
    } else {
      desc = nu + ' years ago'
    }
  }
  return desc
}
