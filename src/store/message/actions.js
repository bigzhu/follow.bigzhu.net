import axios from 'axios'
import _ from 'lodash'
/*
export const someAction = (state) => {
}
*/

// 获取新信息
export const getNew = ({ state, commit, dispatch }, { StarName, SearchKey, After, Limit, explore }) => {
  commit('newLoading', true)
  let params = {
    not: state.noTypes,
    Limit: Limit,
    After: After,
    StarName: StarName,
    SearchKey: SearchKey
  }
  return axios.get('/api/messages/New', {
    params: params
  }).then(function (response) {
    let data = response.data
    commit('newMessages', data)
    commit('newLoading', false)
    return data
  })
}

// 记录看到哪条信息
export const recordLastMessage = ({ state, commit, dispatch }, time) => {
  return axios.put('/apiLast', {
    last: time
  }).then(function (response) {
    state.unreadMessageCount = response.data
    commit('lastTime', parseInt(time, 10))
    return response.data
  })
}
// 收藏
export const collect = ({ state, commit, dispatch }, messageID) => {
  let params = {
    messageId: messageID
  }
  return axios.post('/apiCollect', params)
    .then(function (response) {
    })
}

// 取消收藏
export const uncollect = ({ state, commit, dispatch }, messageID) => {
  return axios.delete('/apiCollect', {
    params: {
      messageId: messageID
    }
  }).then(function (response) {
  })
}
export const getCollect = ({ state, commit, dispatch }) => {
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
export const newMessage = ({ state, commit, dispatch }, { StarName, SearchKey, Limit, explore }) => {
  let messages = []
  let After = null
  if (StarName) {
    messages = state.starsMessages[StarName]
  } else if (explore) {
    messages = state.exploreMessages
  } else if (SearchKey) {
    messages = state.searchMessages
  } else {
    messages = state.messages
  }
  if (messages && messages.length > 0) {
    After = messages[messages.length - 1].OutCreatedAt
  } else { // 第一次, 找最近3天的
    let dt = new Date()
    dt.setDate(dt.getDate() - 2)
    After = dt.getTime()
    if (StarName) { // 如果是查某个 star, 只看近3天, 可能什么都找不到
      After = null
    }
  }
  if (!Limit) {
    Limit = 10
  }
  return dispatch('getNew', {
    StarName: StarName,
    SearchKey: SearchKey,
    After: After,
    Limit: Limit,
    Explore: explore
  })
}
export const oldMessage = ({ state, commit, dispatch }, { StarName, searchKey }) => {
  let messages = null
  let before = null
  if (StarName) {
    messages = state.starsMessages[StarName]
  } else if (searchKey) {
    messages = state.searchMessages
  } else {
    messages = state.messages
  }
  if (messages.length > 0) {
    before = messages[0].OutCreatedAt
  } else { // 第一次, 找当前以前的
    before = (new Date()).toJSON()
  }
  return dispatch('getOld', {
    StarName: StarName,
    SearchKey: searchKey,
    Before: before
  })
}

export const getOld = ({ state, commit, dispatch }, { StarName, SearchKey, Before }) => {
  commit('oldLoading', true)
  let params = {
    Not: state.noTypes,
    StarName: StarName,
    SearchKey: SearchKey,
    Before: Before
  }
  return axios.get('/api/messages/Old', {
    params: params
  })
    .then(function (response) {
      let messages = response.data
      if (messages.length === 0) { // 没有取到数
        if (StarName) {
          // toastr.info(StarName + '没有更多的历史消息可以看了')
        } else if (SearchKey) {
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
        if (StarName) {
          commit('starOldMessages', {
            StarName: StarName,
            messages: messages
          })
        } else if (SearchKey) { // search
          commit('SET_OLD_SEARCH_MESSAGES', messages)
        } else { // main
          commit('oldMessages', messages)
        }
      }
      commit('oldLoading', false)
      commit('reflashTimeLen')
    })
}
export const getTheMessage = ({ state, commit, dispatch }, id) => {
  let message = _.find(state.messages, function (d) {
    return d.ID === parseInt(id, 10)
  })
  // 在star message里再找找
  if (!message) {
    for (let StarName in state.starsMessages) {
      message = _.find(state.starsMessages[StarName], function (d) {
        return d.ID === parseInt(id, 10)
      })
    }
  }
  if (message) {
    commit('theMessage', message)
    return
  }
  return axios.get('/api/message/' + id.toString()).then((response) => {
    commit('theMessage', response.data)
    return response.data
  })
}
