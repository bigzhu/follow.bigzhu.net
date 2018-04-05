/*
export const someMutation = (state) => {
}
*/
import _ from 'lodash'
import Vue from 'vue'

function initGodMessage(state, god_name) {
  if (state.gods_messages[god_name] === undefined) {
    Vue.set(state.gods_messages, god_name, [])
  }
}

export const new_messages = (state, messages) => {
  let mergeMessages = state.messages.concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function(d) {
    return d.id
  })
  state.messages = uniqMessages
}
export const last_time = (state, time) => {
  state.last_time = time
}
export const show_how_to_use_collect = (state, show) => {
  state.show_how_to_use_collect = show
}

export const collect_messages = (state, collect_messages) => {
  // 收藏要翻过来排序, 后藏的,显示在最前面
  state.collect_messages = _.reverse(collect_messages)
}
export const filter_god_messages = (state, god_name) => { // 从主线messages中把god message 过滤出来，避免页面空白
  initGodMessage(state, god_name)
  if (state.messages.length !== 0 && state.gods_messages[god_name].length === 0) {
    let godMessages = _.filter(state.messages, (d) => {
      return d.god_name === god_name
    })
    state.gods_messages[god_name] = godMessages
  }
}
export const god_new_messages = (state, {
  god_name,
  messages
}) => {
  initGodMessage(state, god_name)
  let mergeMessages = state.gods_messages[god_name].concat(messages)
  let uniqMessages = _.uniqBy(mergeMessages, function(d) {
    return d.id
  })
  state.gods_messages[god_name] = uniqMessages
}
export const god_old_messages = (state, {
  god_name,
  messages
}) => {
  initGodMessage(state, god_name)
  state.gods_messages[god_name] = _.uniq(
    messages.reverse().concat(state.gods_messages[god_name]), false,
    function(item, key, a) {
      return item.id
    }
  )
}
export const reflash_time_len = (state) => { // 更新时间隔
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
export const old_messages = (state, messages) => {
  state.messages = _.uniq(
    messages.reverse().concat(state.messages), false,
    function(item, key, a) {
      return item.id
    }
  )
}
export const new_loading = (state, loading) => {
  state.new_loading = loading
}
export const old_loading = (state, loading) => {
  state.old_loading = loading
}
export const unread_message_count = (state, unread_message_count) => {
  state.unread_message_count = unread_message_count
}
export const the_message = (state, the_message) => {
  state.the_message = the_message
}
