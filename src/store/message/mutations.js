/*
export const someMutation = (state) => {
}
*/
import _ from 'lodash'
import Vue from 'vue'

function initStarMessage (state, StarName) {
  if (state.starsMessages[StarName] === undefined) {
    Vue.set(state.starsMessages, StarName, [])
  }
}

export const newMessages = (state, messages) => {
  let mergeMessages = state.messages.concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function (d) {
    return d.ID
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
  state.collectMessages = _.reverse(collectMessages)
}
export const filterStarMessages = (state, StarName) => { // 从主线messages中把star message 过滤出来，避免页面空白
  initStarMessage(state, StarName)
  if (state.messages.length !== 0 && state.starsMessages[StarName].length === 0) {
    let starMessages = _.filter(state.messages, (d) => {
      return d.StarName === StarName
    })
    state.starsMessages[StarName] = starMessages
  }
}
export const starNewMessages = (state, {
  StarName,
  messages
}) => {
  initStarMessage(state, StarName)
  let mergeMessages = state.starsMessages[StarName].concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function (d) {
    return d.ID
  })
  state.starsMessages[StarName] = uniqMessages
}
export const starOldMessages = (state, {
  StarName,
  messages
}) => {
  initStarMessage(state, StarName)
  state.starsMessages[StarName] = _.uniq(
    messages.reverse().concat(state.starsMessages[StarName]), false,
    function (item, key, a) {
      return item.id
    }
  )
}
export const reflashTimeLen = (state) => { // 更新时间隔
  if (state.lastReflashOper) {
    _.map(state.messages,
      (d) => {
        d.CreatedAt = d.CreatedAt + 1
        return d
      }
    )
    state.lastReflashOper = 0
  } else {
    _.map(state.messages,
      (d) => {
        d.CreatedAt = d.CreatedAt - 1
        return d
      }
    )
    state.lastReflashOper = 1
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
  state.oldLoading = loading
}
export const unreadMessageCount = (state, unreadMessageCount) => {
  state.unreadMessageCount = unreadMessageCount
}
export const theMessage = (state, theMessage) => {
  state.theMessage = theMessage
}
