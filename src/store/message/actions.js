import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getOauthInfo = (state) => {
  return axios.get('/api_oauth_info')
    .then(function(response) {
      let data = response.data
      if (!data.error) {
        state.oauthInfo = data
        return data
      } else {
        console.log(response)
      }
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const getNoTypes = (state) => {
  return axios.get('/api_no_types')
    .then((response) => {
      state.noTypes = response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const getNew = ({
  state,
  commit,
  dispatch
}, {
  godName,
  searchKey,
  after,
  limit,
  explore
}) => {
  commit('SET_NEW_LOADING', true)
  var params = {
    not: state.noTypes,
    limit: limit,
    after: after,
    godName: godName,
    searchKey: searchKey
  }
  return axios.get('/api_new', {
      params: params
    })
    .then(function(response) {
      let data = response.data
      state.unread_message_count = data.unread_message_count
      if (data.messages.length === 0) { // 没有取到数
        state.followed_god_count = data.followed_god_count
        if (searchKey && state.search_messages.length === 0) {
          // oldMessage({ dispatch, state }, {searchKey: searchKey})
        } else if (godName && state.gods_messages[godName].length === 0) { // 没数就查出old
          // oldMessage({ dispatch, state }, {godName: godName})
        } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
          // oldMessage({ dispatch, state }, {limit: 2})
        }
      } else {
        // state.followed_god_count = -1
        if (godName) { // 查god的new
          commit('SET_GODS_NEW_MESSAGES', {
            godName: godName,
            messages: data.messages
          })
        } else if (explore) { // explore
          commit('SET_EXPLORE_NEW_MESSAGES', data.messages)
        } else if (searchKey) { // search
          commit('SET_NEW_SEARCH_MESSAGES', data.messages)
        } else { // main
          commit('SET_NEW_MESSAGES', data.messages)
          // commit('REFRESH_UNREAD_MESSAGE_COUNT')
        }
      }
      commit('SET_NEW_LOADING', false)
      // commit('REFLASH_TIME_LEN')
      return data
    })
    .catch(function(error) {
      console.log(error)
    })
}

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
        commit('SET_LAST_TIME', parseInt(time, 10))
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
