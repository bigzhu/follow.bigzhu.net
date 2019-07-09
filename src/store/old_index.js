import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
import _ from 'lodash'

// state
export const state = {
  noTypes: ['github'],
  show_types: ['twitter', 'instagram', 'tumblr'],
  layout: null,
  hide_params: { // 为了 scroll 效率, 只部分显示 messages
    padding_top: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
  },

  last_scroll_top: 0, //
  nav_bar_height: 0,
  showBar: true, // top bar是否显示
  registeredCount: -1,
  last_reflash_oper: 0,
  lastTime: 0,
  old_loading: false,
  newLoading: false,
  info: {
    header: '',
    info: ''
  }

}
// mutations
export const mutations = {
  REMOVE_THIS_GOD_catMyGods(state, godID) {
    for (var property in state.catMyGods) {
      if (state.catMyGods.hasOwnProperty(property)) {
        let index = _.findIndex(state.catMyGods[property], function(d) {
          return d.godID === godID
        })
        state.catMyGods[property].splice(index, 1)
      }
    }

    for (property in state.catGods) {
      if (state.catGods.hasOwnProperty(property)) {
        let index = _.findIndex(state.catGods[property], function(d) {
          return d.godID === godID
        })
        state.catGods[property].splice(index, 1)
      }
    }
  },
  REMOVE_THIS_GOD_MESSAGE(state, godID) {
    state.messages = _.filter(state.messages, function(d) {
      return d.godID !== godID
    })
  },
  CHECK_BAR(state, scrollTarget) {
    var st = scrollTarget.scrollTop
    state.nav_bar_height = document.getElementsByClassName('header-bz')[0].offsetHeight

    if (Math.abs(state.last_scroll_top - st) <= 5) return

    if (st > state.last_scroll_top && st > state.nav_bar_height) {
      state.showBar = false
    } else {
      state.showBar = true
    }

    state.last_scroll_top = st
  },
  SET_SHOW_BAR(state, showBar) {
    state.showBar = showBar
  },

  SET_MY_CATS(state, cats) {
    state.myCats = cats
  },
  SET_GOD_IS_EXISTS(state, isExists) {
    state.godIsExists = isExists
  },
  REMOVE_FROM_MY_MESSAGES(state, godID) { // 移除这个god
    state.messages = _.without(state.messages, _.findWhere(state.messages, {
      godID: godID
    }))
  },
  DELETE_MY_GOD(state, godID) { // 移除这个god
    state.myGods = _.without(state.myGods, _.findWhere(state.myGods, {
      id: godID
    }))
  },
  SET_BIG_GODS(state, gods) {
    state.bigGods = gods
  },
  REFRESH_LOCAL_UNREAD_MESSAGE_COUNT(state) {
    let unreadMessages = _.partition(state.messages, (d) => {
      return d.out_created_at > state.lastTime
    })[0]
    state.local_unread_message_count = unreadMessages.length
  },
  filter_god_messages(state, starName) { // 从主线messages中把god message 过滤出来，避免页面空白
    initGodMessage(state, starName)
    if (state.messages.length !== 0 && state.godsMessages[starName].length === 0) {
      let godMessages = _.filter(state.messages, (d) => {
        return d.starName === starName
      })
      state.godsMessages[starName] = godMessages
    }
  },
  FILTER_SEARCH_MESSAGES(state, searchKey) { // 从主线messages中把查找的信息过滤出来，避免页面空白
    if (state.messages.length !== 0) {
      state.search_messages = state.messages.filter(function(d) {
        if (d.text && d.content) {
          return (d.text.indexOf(searchKey) !== -1 || String(d.content).indexOf(searchKey) !== -1)
        }
        if (d.text) {
          return d.text.indexOf(searchKey) !== -1
        }
        if (d.content) {
          return String(d.content).indexOf(searchKey) !== -1
        }
        return false
      })
    }
  },
  SET_EXPLORE_new_messages(state, starName, messages) {
    state.explore_messages = _.uniq(
      state.explore_messages.concat(messages), false,
      function(item, key, a) {
        return item.id
      }
    )
  },

  SET_GOD_INFO(state, godInfo) {
    state.godInfo = godInfo
  },

  old_loading(state, loading) {
    state.old_loading = loading
  },

  SET_OLD_SEARCH_MESSAGES(state, messages) {
    state.search_messages = _.uniq(
      messages.reverse().concat(state.search_messages), false,
      function(item, key, a) {
        return item.id
      }
    )
  },
  SET_INFO(state, header, info) {
    state.info.header = header
    state.info.info = info
  },
  SET_NEW_SEARCH_MESSAGES(state, messages) {
    let mergeMessages = state.search_messages.concat(messages)
    let uniqMessages = _.uniqBy(mergeMessages, function(d) {
      return d.id
    })
    state.search_messages = uniqMessages
  },

}
// actions
export const actions = {
  getNoTypes({
    state,
    commit,
    dispatch
  }) {
    return axios.get('/api_noTypes')
      .then((response) => {
        state.noTypes = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  setNoTypes({
    state,
    commit,
    dispatch
  }, noTypes) {
    state.noTypes = noTypes
    return axios.put('/api_noTypes', noTypes)
      .then((response) => {})
      .catch(function(error) {
        console.log(error)
      })
  },




  addRemark({
    dispatch,
    state
  }, params) {
    return axios.post('/api_remark', params)
      .then(function(response) {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },


  getBlock({
    state,
    commit,
    dispatch
  }, parm) {
    return dispatch('get', {
      url: '/api_block',
      body: parm,
      loading: true
    })
  },
  postBlock({
    state,
    commit,
    dispatch
  }, godID) {
    let parm = {
      godID: godID
    }
    return dispatch('post', {
      url: '/api_block',
      body: parm,
      loading: false
    }).then(function(data) {
      // toastr.info('已屏蔽此人')
      return data
    })
  },



  getNew({
    state,
    commit,
    dispatch
  }, {
    starName,
    searchKey,
    after,
    limit,
    explore
  }) {
    commit('newLoading', true)
    var params = {
      not: state.noTypes,
      limit: limit,
      after: after,
      starName: starName,
      searchKey: searchKey
    }
    return axios.get('/api_new', {
        params: params
      })
      .then(function(response) {
        let data = response.data
        state.unread_message_count = data.unread_message_count
        if (data.messages.length === 0) { // 没有取到数
          state.followingGodCount = data.followingGodCount
          if (searchKey && state.search_messages.length === 0) {
            // oldMessage({ dispatch, state }, {searchKey: searchKey})
          } else if (starName && state.godsMessages[starName].length === 0) { // 没数就查出old
            // oldMessage({ dispatch, state }, {starName: starName})
          } else if (state.messages.length === 0 && limit === 5) { // 只在prenew的时候没有query old 一次就可以了
            // oldMessage({ dispatch, state }, {limit: 2})
          }
        } else {
          // state.followingGodCount = -1
          if (starName) { // 查god的new
            commit('god_new_messages', {
              starName: starName,
              messages: data.messages
            })
          } else if (explore) { // explore
            commit('SET_EXPLORE_new_messages', data.messages)
          } else if (searchKey) { // search
            commit('SET_NEW_SEARCH_MESSAGES', data.messages)
          } else { // main
            commit('SET_new_messages', data.messages)
            // commit('REFRESH_UNREAD_MESSAGE_COUNT')
          }
        }
        commit('newLoading', false)
        // commit('reflash_time_len')
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  getMyGods({
    state,
    commit,
    dispatch
  }, cat) {
    let params = {
      cat: cat,
      following: true
    }
    let gods = state.catMyGods[cat]
    if (gods && gods.length > 0) {
      params.before = gods[gods.length - 1].created_at
    }
    return axios.get('/api_gods', {
        params: params
      })
      .then(function(response) {
        commit('SET_catMyGods', {
          cat: cat,
          gods: response.data
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  getGods({
    state,
    commit,
    dispatch
  }, parm) {
    return dispatch('get', {
      url: '/api_gods',
      body: parm
    })
  },
  getGod({
    state,
    commit,
    dispatch
  }, val) {
    let starName
    if (typeof val === 'string') {
      starName = val
    } else {
      starName = val.starName
      // loading = val.loading
    }
    if (state.godInfos[starName]) {
      return
    }
    return axios.get('/api_god', {
        params: {
          starName: starName
        }
      })
      .then(function(response) {
        commit('godInfos', response.data)
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },




}

// getters
export const getters = {}
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    p
  }
})
