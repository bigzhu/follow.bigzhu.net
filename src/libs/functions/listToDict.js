// 把list(array) 转为 dict(object)
export default function (l) {
  let d = {}
  for (var i = 0; i < l.length; i++) { d[l[i]] = '' }
  return d
}
