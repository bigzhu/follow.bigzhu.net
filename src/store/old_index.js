import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
import _ from 'lodash'
function initGodMessage(state, godName) {
  if (state.gods_messages[godName] === undefined) {
    Vue.set(state.gods_messages, godName, [])
  }
}

// state
export const state = {
  noTypes: ['github'],
  show_types: ['twitter', 'instagram', 'tumblr'],
  layout: null,
  hide_params: { // 为了 scroll 效率, 只部分显示 messages
    padding_top: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
  },
  anki: {
    user_name: null,
    password: null
  },
  last_scroll_top: 0, //
  nav_bar_height: 0,
  showBar: true, // top bar是否显示
  registered_count: -1,
  last_reflash_oper: 0,
  last_time: 0,
  old_loading: false,
  new_loading: false,
  info: {
    header: '',
    info: ''
  }

}
// mutations
export const mutations = {
  REMOVE_THIS_GOD_CAT_MY_GODS(state, godID) {
    for (var property in state.catMyGods) {
      if (state.catMyGods.hasOwnProperty(property)) {
        let index = _.findIndex(state.catMyGods[property], function(d) {
          return d.godID === godID
        })
        state.catMyGods[property].splice(index, 1)
      }
    }

    for (property in state.cat_gods) {
      if (state.cat_gods.hasOwnProperty(property)) {
        let index = _.findIndex(state.cat_gods[property], function(d) {
          return d.godID === godID
        })
        state.cat_gods[property].splice(index, 1)
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

  SET_CAT_GODS(state, {
    cat,
    gods
  }) {
    initCatGod(state, 'cat_gods', cat)
    let mergeGods = state.cat_gods[cat].concat(gods)
    let uniqGods = _.uniqBy(mergeGods, function(d) {
      return d.id
    })
    state.cat_gods[cat] = uniqGods
  },
  UNSHIFT_MY_GOD(state, {
    cat,
    god
  }) {
    state.catMyGods[cat].unshift(god)
  },
  SET_MY_CATS(state, cats) {
    state.my_cats = cats
  },
  REFLASH_TIME_LEN(state) { // 更新时间隔
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
  },
  SET_THE_MESSAGE(state, message) {
    state.the_message = message
  },
  SET_GOD_IS_EXISTS(state, isExists) {
    state.god_isExists = isExists
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
  SET_GOD_INFOS(state, godInfo) {
    Vue.set(state.godInfos, godInfo.name, godInfo)
  },
  SET_BIG_GODS(state, gods) {
    state.big_gods = gods
  },
  REFRESH_LOCAL_UNREAD_MESSAGE_COUNT(state) {
    let unreadMessages = _.partition(state.messages, (d) => {
      return d.out_created_at > state.last_time
    })[0]
    state.local_unread_message_count = unreadMessages.length
  },
  FILTER_GOD_MESSAGES(state, godName) { // 从主线messages中把god message 过滤出来，避免页面空白
    initGodMessage(state, godName)
    if (state.messages.length !== 0 && state.gods_messages[godName].length === 0) {
      let godMessages = _.filter(state.messages, (d) => {
        return d.godName === godName
      })
      state.gods_messages[godName] = godMessages
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
  SET_GODS_OLD_MESSAGES(state, {
    godName,
    messages
  }) {
    initGodMessage(state, godName)
    state.gods_messages[godName] = _.uniq(
      messages.reverse().concat(state.gods_messages[godName]), false,
      function(item, key, a) {
        return item.id
      }
    )
  },
  SET_EXPLORE_NEW_MESSAGES(state, godName, messages) {
    state.explore_messages = _.uniq(
      state.explore_messages.concat(messages), false,
      function(item, key, a) {
        return item.id
      }
    )
  },
  SET_GODS_NEW_MESSAGES(state, {
    godName,
    messages
  }) {
    initGodMessage(state, godName)
    let mergeMessages = state.gods_messages[godName].concat(messages)
    let uniqMessages = _.uniqBy(mergeMessages, function(d) {
      return d.id
    })
    state.gods_messages[godName] = uniqMessages
  },
  SET_GOD_INFO(state, godInfo) {
    state.godInfo = godInfo
  },

  SET_OLD_LOADING(state, loading) {
    state.old_loading = loading
  },

  SET_OLD_MESSAGES(state, messages) {
    state.messages = _.uniq(
      messages.reverse().concat(state.messages), false,
      function(item, key, a) {
        return item.id
      }
    )
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
    return axios.get('/api_no_types')
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
    return axios.put('/api_no_types', noTypes)
      .then((response) => {})
      .catch(function(error) {
        console.log(error)
      })
  },
  getAnki({
    state,
    commit,
    dispatch
  }) {
    return dispatch('get', {
      url: '/api_anki',
      loading: true
    }).then(function(data) {
      if (data.anki !== null) {
        state.anki = data.anki
      }
    })
  },
  loginAnki({
    state,
    commit,
    dispatch
  }, anki) {
    return dispatch('post', {
      url: '/api_login_anki',
      body: anki,
      loading: true
    })
  },
  postAnki({
    state,
    commit,
    dispatch
  }, params) {
    return axios.post('/api_anki', params)
      .then(function(response) {})
      .catch(function(error) {
        console.log(error)
      })
  },
  putGod({
    dispatch,
    state,
    actions
  }, god) {
    var params = god
    return axios.put('/api_god', params)
      .then(function(response) {})
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
  checkSocial({
    state,
    commit,
    dispatch
  }, {
    name,
    type
  }) {
    var params = {
      name: name,
      type: type
    }
    return axios.get('/api_social', {
        params: params
      })
      .then((response) => {
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  postGod({
    state,
    commit,
    dispatch
  }, {
    name,
    cat
  }) {
    var params = {
      name: name,
      cat: cat
    }
    return axios.post('/api_god', params)
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
  newMessage({
    state,
    commit,
    dispatch
  }, {
    godName,
    searchKey,
    limit,
    explore
  }) {
    let messages = null
    let after = null
    if (godName) {
      messages = state.gods_messages[godName]
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
      if (godName) { // 如果是查某个 god, 只看近3天, 可能什么都找不到
        after = null
      }
    }
    if (!limit) {
      limit = 10
    }
    return dispatch('getNew', {
      godName: godName,
      searchKey: searchKey,
      after: after,
      limit: limit,
      explore: explore
    })
  },
  unfollow({
    state,
    commit,
    dispatch
  }, godID) {
    return axios.delete('/api_follow', {
        params: {
          godID: godID
        }
      })
      .then(function(response) {})
      .catch(function(error) {
        console.log(error)
      })
  },
  follow({
    state,
    commit,
    dispatch
  }, godID) {
    let params = {
      godID: godID
    }
    return axios.post('/api_follow', params)
      .then(function(response) {})
      .catch(function(error) {
        console.log(error)
      })
  },
  getTheMessage({
    state,
    commit,
    dispatch
  }, id) {
    let message = _.find(state.messages, function(d) {
      return d.id === parseInt(id, 10)
    })
    // 在god message里再找找
    if (!message) {
      for (var godName in state.gods_messages) {
        message = _.find(state.gods_messages[godName], function(d) {
          return d.id === parseInt(id, 10)
        })
      }
    }
    if (message) {
      commit('SET_THE_MESSAGE', message)
      return
    }
    let parm = {
      id: id
    }
    return dispatch('get', {
      url: '/api_message',
      body: parm
    }).then(function(data) {
      commit('SET_THE_MESSAGE', data.message)
    })
  },
  getRegisteredCount({
    state,
    commit,
    dispatch
  }, status) {
    return axios.get('/api_registered')
      .then(function(response) {
        state.registered_count = response.data.registered_count
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  getNew({
    state,
    commit,
    dispatch
  }, {
    godName,
    searchKey,
    after,
    limit,
    explore
  }) {
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
  },
  getCat({
    state,
    commit,
    dispatch
  }, isMy) {
    let params = {}
    if (isMy !== 0) {
      params = {
        isMy: isMy
      }
    }

    return axios.get('/api_cat', {
        params: params
      })
      .then(function(response) {
        let data = response.data
        if (isMy) {
          state.my_cats = data
        } else {
          state.cats = data
        }
        return data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  getPublicGods({
    state,
    commit,
    dispatch
  }, cat) {
    let params = {
      cat: cat
    }
    let gods = state.cat_gods[cat]
    if (gods) {
      params.before = gods[gods.length - 1].created_at
    }
    return axios.get('/api_gods', {
        params: params
      })
      .then(function(response) {
        commit('SET_CAT_GODS', {
          cat: cat,
          gods: response.data
        })
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
      followed: true
    }
    let gods = state.catMyGods[cat]
    if (gods && gods.length > 0) {
      params.before = gods[gods.length - 1].created_at
    }
    return axios.get('/api_gods', {
        params: params
      })
      .then(function(response) {
        commit('SET_CAT_MY_GODS', {
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
    let godName
    if (typeof val === 'string') {
      godName = val
    } else {
      godName = val.godName
      // loading = val.loading
    }
    if (state.godInfos[godName]) {
      return
    }
    return axios.get('/api_god', {
        params: {
          godName: godName
        }
      })
      .then(function(response) {
        commit('SET_GOD_INFOS', response.data)
        return response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },

  oldMessage({
    state,
    commit,
    dispatch
  }, {
    godName,
    searchKey,
    limit
  }) {
    let messages = null
    let before = null
    if (godName) {
      messages = state.gods_messages[godName]
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
      godName: godName,
      searchKey: searchKey,
      before: before,
      limit: limit
    })
  },
  getOld({
    state,
    commit,
    dispatch
  }, {
    godName,
    searchKey,
    before,
    limit
  }) {
    commit('SET_OLD_LOADING', true)
    var params = {
      not: state.noTypes,
      godName: godName,
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
          if (godName) {
            // toastr.info(godName + '没有更多的历史消息可以看了')
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
          if (godName) {
            commit('SET_GODS_OLD_MESSAGES', {
              godName: godName,
              messages: messages
            })
          } else if (searchKey) { // search
            commit('SET_OLD_SEARCH_MESSAGES', messages)
          } else { // main
            commit('SET_OLD_MESSAGES', messages)
          }
        }
        commit('SET_OLD_LOADING', false)
        commit('REFLASH_TIME_LEN')
      })
      .catch(function(error) {
        console.log(error)
      })
  }

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
