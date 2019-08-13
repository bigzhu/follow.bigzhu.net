import axios from 'axios'
import _ from 'lodash'
/*
export const someAction = (state) => {
}
*/

// 获取新信息
export const getNew = ({
  state,
  commit,
  dispatch
}, {
  starName,
  searchKey,
  after,
  limit,
  explore
}) => {
  commit('newLoading', true)
  var params = {
    not: state.noTypes,
    limit: limit,
    after: after,
    starName: starName,
    searchKey: searchKey
  }
  return axios.get('/api/messages/new', {
      params: params
    })
    .then(function (response) {
      let data = response.data
      commit('newMessages', data)
      /*
      commit('unreadMessageCount', data.unreadMessageCount)
      if (data.messages.length === 0) { // 没有取到数
        state.followingGodCount = data.followingGodCount
        if (searchKey && state.searchMessages.length === 0) {
          // oldMessage({ dispatch, state }, {searchKey: searchKey})
        } else if (starName && state.godsMessages[starName].length === 0) { // 没数就查出old
          // oldMessage({ dispatch, state }, {starName: starName})
        } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
          // oldMessage({ dispatch, state }, {limit: 2})
        }
      } else {
        // state.followingGodCount = -1
        if (starName) { // 查god的new
          commit('godNewMessages', {
            starName: starName,
            messages: data.messages
          })
        } else if (explore) { // explore
          commit('setExploreNewMessages', data.messages)
        } else if (searchKey) { // search
          commit('setNewSearchMessages', data.messages)
        } else { // main
          commit('newMessages', data.messages)
        }
      }
      */
      commit('newLoading', false)
      // commit('reflashTimeLen')
      return data
    })
    .catch(function (error) {
      console.log(error)
    })
}

// 记录看到哪条信息
export const recordLastMessage = ({
  state,
  commit,
  dispatch
}, time) => {
  return axios.put('/apiLast', {
      last: time
    })
    .then(function (response) {
      state.unreadMessageCount = response.data
      commit('lastTime', parseInt(time, 10))
      // commit('REFRESH_LOCAL_UNREAD_MESSAGE_COUNT')
      // 如果<20了，就预加载一些
      /*
      if (state.localUnreadMessageCount <= 20) {
        let after = null
        if (state.messages.length > 0) {
          after = state.messages[state.messages.length - 1].createdAt
        }
        dispatch('getNew', {after: after, limit: 50})
      }
      */
      return response.data
    })
    .catch(function (error) {
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
    messageId: messageID
  }
  return axios.post('/apiCollect', params)
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })
}

// 取消收藏
export const uncollect = ({
  state,
  commit,
  dispatch
}, messageID) => {
  return axios.delete('/apiCollect', {
      params: {
        messageId: messageID
      }
    })
    .then(function (response) {})
    .catch(function (error) {
      console.log(error)
    })
}
export const getCollect = ({
  state,
  commit,
  dispatch
}) => {
  commit('newLoading', true)
  return axios.get('/apiCollect')
    .then(function (response) {
      commit('collectMessages', response.data)
      if (state.collectMessages.length === 0) {
        commit('showHowToUseCollect', true)
      } else {
        commit('showHowToUseCollect', false)
      }
      commit('newLoading', false)
      return response.data
    })
}
export const newMessage = ({
  state,
  commit,
  dispatch
}, {
  starName,
  searchKey,
  limit,
  explore
}) => {
  let messages = null
  let after = null
  if (starName) {
    messages = state.godsMessages[starName]
  } else if (explore) {
    messages = state.exploreMessages
  } else if (searchKey) {
    messages = state.searchMessages
  } else {
    messages = state.messages
  }
  if (messages.length > 0) {
    after = messages[messages.length - 1].createdAt
  } else { // 第一次, 找最近3天的
    let dt = new Date()
    dt.setDate(dt.getDate() - 2)
    after = dt.getTime()
    if (starName) { // 如果是查某个 god, 只看近3天, 可能什么都找不到
      after = null
    }
  }
  if (!limit) {
    limit = 10
  }
  return dispatch('getNew', {
    starName: starName,
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
  starName,
  searchKey
}) => {
  let messages = null
  let before = null
  if (starName) {
    messages = state.godsMessages[starName]
  } else if (searchKey) {
    messages = state.searchMessages
  } else {
    messages = state.messages
  }
  if (messages.length > 0) {
    before = messages[0].OutCreatedAt
  } else { // 第一次, 找当前以前的
    // before = new Date().getTime()
    // before = (new Date()).toISOString()
    before = (new Date()).toJSON()
  }
  return dispatch('getOld', {
    starName: starName,
    searchKey: searchKey,
    before: before
  })
}

export const getOld = ({
  state,
  commit,
  dispatch
}, {
  starName,
  searchKey,
  before
}) => {
  commit('oldLoading', true)
  var params = {
    not: state.noTypes,
    starName: starName,
    searchKey: searchKey,
    before: before
  }
  return axios.get('/api/messages/old', {
      params: params
    })
    .then(function (response) {
      let messages = response.data
      if (messages.length === 0) { // 没有取到数
        if (starName) {
          // toastr.info(starName + '没有更多的历史消息可以看了')
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
        if (starName) {
          commit('godOldMessages', {
            starName: starName,
            messages: messages
          })
        } else if (searchKey) { // search
          commit('SET_OLD_SEARCH_MESSAGES', messages)
        } else { // main
          commit('oldMessages', messages)
        }
      }
      commit('oldLoading', false)
      commit('reflashTimeLen')
    })
}
export const getTheMessage = ({
  state,
  commit,
  dispatch
}, id) => {
  let message = _.find(state.messages, function (d) {
    return d.id === parseInt(id, 10)
  })
  // 在god message里再找找
  if (!message) {
    for (var starName in state.godsMessages) {
      message = _.find(state.godsMessages[starName], function (d) {
        return d.id === parseInt(id, 10)
      })
    }
  }
  if (message) {
    commit('theMessage', message)
    return
  }
  let params = {
    id: id
  }
  return axios.get('/apiMessage', {
    params: params
  }).then((response) => {
    commit('theMessage', response.data)
    return response.data
  })
}
