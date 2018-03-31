// 判断一个string有没有在list里
import listToDict from './listToDict'
export default function (key, list) {
  return (key in listToDict(list))
}
