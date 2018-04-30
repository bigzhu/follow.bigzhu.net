import axios from 'axios'
import _ from 'lodash'
/*
export const someAction = (state) => {
}
*/

// 用户信息
export const getOauthInfo = (state) => {
  return axios.get('/api_oauth_info')
    .then(function(response) {
      let data = response.data
      if (!data.error) {
        state.oauth_info = data
        return data
      } else {
        console.log(response)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

// 获取用户不看的社交类型
export const getNoTypes = (state) => {
  return axios.get('/api_no_types')
    .then((response) => {
      state.no_types = response.data
      return response.data
    })
}

// 获取新信息
export const getNew = ({
  state,
  commit,
  dispatch
}, {
  god_name,
  searchKey,
  after,
  limit,
  explore
}) => {
  commit('new_loading', true)
  var params = {
    not: state.no_types,
    limit: limit,
    after: after,
    god_name: god_name,
    searchKey: searchKey
  }
  return axios.get('/APINewMessages', {
      params: params
    })
    .then(function(response) {
      let data = response.data
      console.log(data.length)
      commit('new_messages', data)
      /*
      commit('unread_message_count', data.unread_message_count)
      if (data.messages.length === 0) { // 没有取到数
        state.followed_god_count = data.followed_god_count
        if (searchKey && state.search_messages.length === 0) {
          // oldMessage({ dispatch, state }, {searchKey: searchKey})
        } else if (god_name && state.gods_messages[god_name].length === 0) { // 没数就查出old
          // oldMessage({ dispatch, state }, {god_name: god_name})
        } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
          // oldMessage({ dispatch, state }, {limit: 2})
        }
      } else {
        // state.followed_god_count = -1
        if (god_name) { // 查god的new
          commit('god_new_messages', {
            god_name: god_name,
            messages: data.messages
          })
        } else if (explore) { // explore
          commit('set_explore_new_messages', data.messages)
        } else if (searchKey) { // search
          commit('set_new_search_messages', data.messages)
        } else { // main
          commit('new_messages', data.messages)
        }
      }
      */
      commit('new_loading', false)
      // commit('reflash_time_len')
      return data
    })
    .catch(function(error) {
      console.log(error)
    })
}

// 记录看到哪条信息
export const recordLastMessage = ({
  state,
  commit,
  dispatch
}, time) => {
  // if (state.last_time > parseInt(time, 10)) {
  //   return
  // }
  return axios.put('/api_last', {
      last: time
    })
    .then(function(response) {
      state.unread_message_count = response.data
      commit('last_time', parseInt(time, 10))
      // commit('REFRESH_LOCAL_UNREAD_MESSAGE_COUNT')
      // 如果<20了，就预加载一些
      /*
      if (state.local_unread_message_count <= 20) {
        let after = null
        if (state.messages.length > 0) {
          after = state.messages[state.messages.length - 1].created_at
        }
        dispatch('getNew', {after: after, limit: 50})
      }
      */
      return response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}
// 收藏
export const collect = ({
  state,
  commit,
  dispatch
}, messageID) => {
  var params = {
    message_id: messageID
  }
  return axios.post('/api_collect', params)
    .then(function(response) {})
    .catch(function(error) {
      console.log(error)
    })
}

// 取消收藏
export const uncollect = ({
  state,
  commit,
  dispatch
}, messageID) => {
  return axios.delete('/api_collect', {
      params: {
        message_id: messageID
      }
    })
    .then(function(response) {})
    .catch(function(error) {
      console.log(error)
    })
}
export const getCollect = ({
  state,
  commit,
  dispatch
}) => {
  commit('new_loading', true)
  return axios.get('/api_collect')
    .then(function(response) {
      commit('collect_messages', response.data)
      if (state.collect_messages.length === 0) {
        commit('show_how_to_use_collect', true)
      } else {
        commit('show_how_to_use_collect', false)
      }
      commit('new_loading', false)
      return response.data
    })
}
export const newMessage = ({
  state,
  commit,
  dispatch
}, {
  god_name,
  searchKey,
  limit,
  explore
}) => {
  let messages = null
  let after = null
  if (god_name) {
    messages = state.gods_messages[god_name]
  } else if (explore) {
    messages = state.explore_messages
  } else if (searchKey) {
    messages = state.search_messages
  } else {
    messages = state.messages
  }
  if (messages.length > 0) {
    after = messages[messages.length - 1].created_at
  } else { // 第一次, 找最近3天的
    let dt = new Date()
    dt.setDate(dt.getDate() - 2)
    after = dt.getTime()
    if (god_name) { // 如果是查某个 god, 只看近3天, 可能什么都找不到
      after = null
    }
  }
  if (!limit) {
    limit = 10
  }
  return dispatch('getNew', {
    god_name: god_name,
    searchKey: searchKey,
    after: after,
    limit: limit,
    explore: explore
  })
}
export const oldMessage = ({
  state,
  commit,
  dispatch
}, {
  god_name,
  searchKey,
  limit
}) => {
  let messages = null
  let before = null
  if (god_name) {
    messages = state.gods_messages[god_name]
  } else if (searchKey) {
    messages = state.search_messages
  } else {
    messages = state.messages
  }
  if (messages.length > 0) {
    before = messages[0].out_created_at
  } else { // 第一次, 找当前以前的
    // before = new Date().getTime()
    // before = (new Date()).toISOString()
    before = (new Date()).toJSON()
  }
  if (!limit) {
    limit = 10
  }
  return dispatch('getOld', {
    god_name: god_name,
    searchKey: searchKey,
    before: before,
    limit: limit
  })
}

export const getOld = ({
  state,
  commit,
  dispatch
}, {
  god_name,
  searchKey,
  before,
  limit
}) => {
  commit('old_loading', true)
  var params = {
    not: state.no_types,
    god_name: god_name,
    searchKey: searchKey,
    limit: limit,
    before: before
  }
  return axios.get('/api_old', {
      params: params
    })
    .then(function(response) {
      let messages = response.data
      if (messages.length === 0) { // 没有取到数
        if (god_name) {
          // toastr.info(god_name + '没有更多的历史消息可以看了')
        } else if (searchKey) {
          // toastr.info('没有更多的历史了')
        } else {
          if (state.messages.length === 0) { // 什么都没有，估计是第一次进来, 还没关注人
            // toastr.info('请先关注你感兴趣的人')
            window.router.go({
              name: 'Recommand',
              params: {
                cat: 'recommand'
              }
            })
          } else {
            // toastr.info('没有更多的历史了')
          }
        }
      } else {
        if (god_name) {
          commit('god_old_messages', {
            god_name: god_name,
            messages: messages
          })
        } else if (searchKey) { // search
          commit('SET_OLD_SEARCH_MESSAGES', messages)
        } else { // main
          commit('old_messages', messages)
        }
      }
      commit('old_loading', false)
      commit('reflash_time_len')
    })
}
export const getTheMessage = ({
  state,
  commit,
  dispatch
}, id) => {
  let message = _.find(state.messages, function(d) {
    return d.id === parseInt(id, 10)
  })
  // 在god message里再找找
  if (!message) {
    for (var god_name in state.gods_messages) {
      message = _.find(state.gods_messages[god_name], function(d) {
        return d.id === parseInt(id, 10)
      })
    }
  }
  if (message) {
    commit('the_message', message)
    return
  }
  let params = {
    id: id
  }
  return axios.get('/api_message', {
    params: params
  }).then((response) => {
    commit('the_message', response.data)
    return response.data
  })
}
