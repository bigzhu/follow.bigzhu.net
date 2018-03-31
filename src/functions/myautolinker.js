import Autolinker from 'autolinker'
import replaceSocial from './replaceSocial.js'
export default function (text, type) {
  if (type === 'twitter' || type === 'instagram') {
    return Autolinker.link(text, {mention: type})
  } else {
    let linkText = Autolinker.link(text)
    linkText = replaceSocial(type, linkText)
    return linkText
  }
}
