// 给 html string 的某些tag增加class
// tumblr 返回的 html 中有 图片, 但是没加入 responsive class 导致超出
export default function (content, tagName, className) {
  let el = document.createElement('div')
  el.innerHTML = content
  let tags = el.getElementsByTagName(tagName)
  if (tags.length !== 0) {
    for (let tag of tags) {
      tag.classList.add(className)
    }
  }
  return el.innerHTML
}
