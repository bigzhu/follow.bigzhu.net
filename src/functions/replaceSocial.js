import _ from 'lodash'
export default function (socialType, text) {
  if (!text) return ''
  let pattern = /\B@[a-z0-9_-]+/gi
  let list = text.match(pattern)
  list = _.uniq(list)
  list.map(
    function (key) {
      let name = key.replace(/@/g, '')
      let a = getLinkStr(socialType, name)
      text = text.replace(new RegExp(key, 'g'), a)
    }
  )
  return text
}

// 组出a来
function getLinkStr (socialType, name) {
  let a = ''
  if (socialType === 'instagram') {
    a = `<a target="_blank" href="https://instagram.com/${name}"> @${name}</a>`
  }
  // if (socialType === 'github') {
  //   a = `<a target="_blank" href="https://github.com/${name}"> @${name}</a>`
  // }
  if (socialType === 'tumblr') {
    a = `<a target="_blank" href="http://${name}.tumblr.com"> @${name}</a>`
  }
  if (socialType === 'facebook') {
    a = `<a target="_blank" href="https://facebook.com/${name}"> @${name}</a>`
  }
  return a
}
