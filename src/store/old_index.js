import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
import _ from 'lodash'

// state
export const state = {
  noTypes: ['github'],
  showTypes: ['twitter', 'instagram', 'tumblr'],
  layout: null,
  hideParams: { // 为了 scroll 效率, 只部分显示 messages
    paddingTop: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
  },

  lastScrollTop: 0, //
  navBarHeight: 0,
  showBar: true, // top bar是否显示
  registeredCount: -1,
  lastReflashOper: 0,
  lastTime: 0,
  oldLoading: false,
  newLoading: false,
  info: {
    header: '',
    info: ''
  }

}
// mutations
export const mutations = {
  REMOVE_THIS_GOD_catMyStars(state, godID) {
    for (var property in state.catMyStars) {
      if (state.catMyStars.hasOwnProperty(property)) {
        let index = _.findIndex(state.catMyStars[property], function(d) {
          return d.godID === godID
        })
        state.catMyStars[property].splice(index, 1)
      }
    }

    for (property in state.catStars) {
      if (state.catStars.hasOwnProperty(property)) {
        let index = _.findIndex(state.catStars[property], function(d) {
          return d.godID === godID
        })
        state.catStars[property].splice(index, 1)
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
    state.navBarHeight = document.getElementsByClassName('header-bz')[0].offsetHeight

    if (Math.abs(state.lastScrollTop - st) <= 5) return

    if (st > state.lastScrollTop && st > state.navBarHeight) {
      state.showBar = false
    } else {
      state.showBar = true
    }

    state.lastScrollTop = st
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
    state.myStars = _.without(state.myStars, _.findWhere(state.myStars, {
      id: godID
    }))
  },
  SET_BIG_GODS(state, gods) {
    state.bigStars = gods
  },
  REFRESH_LOCAL_UNREAD_MESSAGE_COUNT(state) {
    let unreadMessages = _.partition(state.messages, (d) => {
      return d.outCreatedAt > state.lastTime
    })[0]
    state.localUnreadMessageCount = unreadMessages.length
  },
  filterStarMessages(state, StarName) { // 从主线messages中把god message 过滤出来，避免页面空白
    initStarMessage(state, StarName)
    if (state.messages.length !== 0 && state.godsMessages[StarName].length === 0) {
      let godMessages = _.filter(state.messages, (d) => {
        return d.StarName === StarName
      })
      state.godsMessages[StarName] = godMessages
    }
  },
  FILTER_SEARCH_MESSAGES(state, searchKey) { // 从主线messages中把查找的信息过滤出来，避免页面空白
    if (state.messages.length !== 0) {
      state.searchMessages = state.messages.filter(function(d) {
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
  SET_EXPLORE_newMessages(state, StarName, messages) {
    state.exploreMessages = _.uniq(
      state.exploreMessages.concat(messages), false,
      function(item, key, a) {
        return item.id
      }
    )
  },

  SET_GOD_INFO(state, godInfo) {
    state.godInfo = godInfo
  },

  oldLoading(state, loading) {
    state.oldLoading = loading
  },

  SET_OLD_SEARCH_MESSAGES(state, messages) {
    state.searchMessages = _.uniq(
      messages.reverse().concat(state.searchMessages), false,
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
    let mergeMessages = state.searchMessages.concat(messages)
    let uniqMessages = _.uniqBy(mergeMessages, function(d) {
      return d.id
    })
    state.searchMessages = uniqMessages
  },

}
// actions
export const actions = {
  getNoTypes({
    state,
    commit,
    dispatch
  }) {
    return axios.get('/apiNoTypes')
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
    return axios.put('/apiNoTypes', noTypes)
      .then((response) => {})
      .catch(function(error) {
        console.log(error)
      })
  },




  addRemark({
    dispatch,
    state
  }, params) {
    return axios.post('/apiRemark', params)
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
      url: '/apiBlock',
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
      url: '/apiBlock',
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
    StarName,
    searchKey,
    after,
    Limit,
    explore
  }) {
    commit('newLoading', true)
    var params = {
      not: state.noTypes,
      Limit: Limit,
      after: after,
      StarName: StarName,
      searchKey: searchKey
    }
    return axios.get('/apiNew', {
        params: params
      })
      .then(function(response) {
        let data = response.data
        state.unreadMessageCount = data.unreadMessageCount
        if (data.messages.length === 0) { // 没有取到数
          state.followingStarCount = data.followingStarCount
          if (searchKey && state.searchMessages.length === 0) {
            // oldMessage({ dispatch, state }, {searchKey: searchKey})
          } else if (StarName && state.godsMessages[StarName].length === 0) { // 没数就查出old
            // oldMessage({ dispatch, state }, {StarName: StarName})
          } else if (state.messages.length === 0 && Limit === 5) { // 只在prenew的时候没有query old 一次就可以了
            // oldMessage({ dispatch, state }, {Limit: 2})
          }
        } else {
          // state.followingStarCount = -1
          if (StarName) { // 查god的new
            commit('godNewMessages', {
              StarName: StarName,
              messages: data.messages
            })
          } else if (explore) { // explore
            commit('SET_EXPLORE_newMessages', data.messages)
          } else if (searchKey) { // search
            commit('SET_NEW_SEARCH_MESSAGES', data.messages)
          } else { // main
            commit('SET_newMessages', data.messages)
            // commit('REFRESH_UNREAD_MESSAGE_COUNT')
          }
        }
        commit('newLoading', false)
        // commit('reflashTimeLen')
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  getMyStars({
    state,
    commit,
    dispatch
  }, cat) {
    let params = {
      cat: cat,
      following: true
    }
    let gods = state.catMyStars[cat]
    if (gods && gods.length > 0) {
      params.before = gods[gods.length - 1].CreatedAt
    }
    return axios.get('/apiStars', {
        params: params
      })
      .then(function(response) {
        commit('SET_catMyStars', {
          cat: cat,
          gods: response.data
        })
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  getStars({
    state,
    commit,
    dispatch
  }, parm) {
    return dispatch('get', {
      url: '/apiStars',
      body: parm
    })
  },
  getStar({
    state,
    commit,
    dispatch
  }, val) {
    let StarName
    if (typeof val === 'string') {
      StarName = val
    } else {
      StarName = val.StarName
      // loading = val.loading
    }
    if (state.godInfos[StarName]) {
      return
    }
    return axios.get('/apiStar', {
        params: {
          StarName: StarName
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
