/*
export const someMutation = (state) => {
}
*/
import _ from 'lodash'
import Vue from 'vue'

function initGodMessage (state, starName) {
  if (state.godsMessages[starName] === undefined) {
    Vue.set(state.godsMessages, starName, [])
  }
}

export const newMessages = (state, messages) => {
  let mergeMessages = state.messages.concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function (d) {
    return d.id
  })
  state.messages = uniqMessages
}
export const lastTime = (state, time) => {
  state.lastTime = time
}
export const showHowToUseCollect = (state, show) => {
  state.showHowToUseCollect = show
}

export const collectMessages = (state, collectMessages) => {
  // 收藏要翻过来排序, 后藏的,显示在最前面
  state.collect_messages = _.reverse(collectMessages)
}
export const filterGodMessages = (state, starName) => { // 从主线messages中把god message 过滤出来，避免页面空白
  initGodMessage(state, starName)
  if (state.messages.length !== 0 && state.godsMessages[starName].length === 0) {
    let godMessages = _.filter(state.messages, (d) => {
      return d.starName === starName
    })
    state.godsMessages[starName] = godMessages
  }
}
export const godNewMessages = (state, {
  starName,
  messages
}) => {
  initGodMessage(state, starName)
  let mergeMessages = state.godsMessages[starName].concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function (d) {
    return d.id
  })
  state.godsMessages[starName] = uniqMessages
}
export const godOldmessages = (state, {
  starName,
  messages
}) => {
  initGodMessage(state, starName)
  state.godsMessages[starName] = _.uniq(
    messages.reverse().concat(state.godsMessages[starName]), false,
    function (item, key, a) {
      return item.id
    }
  )
}
export const reflashTimeLen = (state) => { // 更新时间隔
  if (state.last_reflash_oper) {
    _.map(state.messages,
      (d) => {
        d.created_at = d.created_at + 1
        return d
      }
    )
    state.last_reflash_oper = 0
  } else {
    _.map(state.messages,
      (d) => {
        d.created_at = d.created_at - 1
        return d
      }
    )
    state.last_reflash_oper = 1
  }
}
export const oldMessages = (state, messages) => {
  state.messages = _.uniq(
    messages.reverse().concat(state.messages), false,
    function (item, key, a) {
      return item.id
    }
  )
}
export const newLoading = (state, loading) => {
  state.newLoading = loading
}
export const oldLoading = (state, loading) => {
  state.old_loading = loading
}
export const unreadMessageCount = (state, unreadMessageCount) => {
  state.unread_message_count = unreadMessageCount
}
export const theMessage = (state, theMessage) => {
  state.the_message = theMessage
}
