/*
export const someMutation = (state) => {
}
*/
import _ from 'lodash'
export const NEW_MESSAGES = (state, messages) => {
  let mergeMessages = state.messages.concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function(d) {
    return d.id
  })
  state.messages = uniqMessages
}
export const LAST_TIME = (state, time) => {
  state.last_time = time
}
export const SHOW_HOW_TO_USE_COLLECT = (state, show) => {
  state.show_how_to_use_collect = show
}

export const COLLECT_MESSAGES = (state, collectMessages) => {
  // 收藏要翻过来排序, 后藏的,显示在最前面
  state.collectMessages = _.reverse(collectMessages)
}
