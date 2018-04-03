/*
export const someMutation = (state) => {
}
*/
import _ from 'lodash'
export const SET_NEW_MESSAGES = (state, messages) => {
  let mergeMessages = state.messages.concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function(d) {
    return d.id
  })
  state.messages = uniqMessages
}
export const SET_LAST_TIME = (state, time) => {
  state.last_time = time
}
export const SET_SHOW_HOW_TO_USE_COLLECT = (state, show) => {
  state.show_how_to_use_collect = show
}
