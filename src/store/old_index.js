import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import axios from 'axios'
import _ from 'lodash'

// state
export const state = {
  no_types: ['github'],
  show_types: ['twitter', 'instagram', 'tumblr'],
  layout: null,
  hide_params: { // 为了 scroll 效率, 只部分显示 messages
    padding_top: 0 // 记录隐藏了 message 以后, 要加对应多少的 padding-top
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
  REMOVE_THIS_GOD_cat_my_gods(state, god_id) {
    for (var property in state.cat_my_gods) {
      if (state.cat_my_gods.hasOwnProperty(property)) {
        let index = _.findIndex(state.cat_my_gods[property], function(d) {
          return d.god_id === god_id
        })
        state.cat_my_gods[property].splice(index, 1)
      }
    }

    for (property in state.cat_gods) {
      if (state.cat_gods.hasOwnProperty(property)) {
        let index = _.findIndex(state.cat_gods[property], function(d) {
          return d.god_id === god_id
        })
        state.cat_gods[property].splice(index, 1)
      }
    }
  },
  REMOVE_THIS_GOD_MESSAGE(state, god_id) {
    state.messages = _.filter(state.messages, function(d) {
      return d.god_id !== god_id
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
    state.my_cats = cats
  },
  SET_GOD_IS_EXISTS(state, isExists) {
    state.god_is_exists = isExists
  },
  REMOVE_FROM_MY_MESSAGES(state, god_id) { // 移除这个god
    state.messages = _.without(state.messages, _.findWhere(state.messages, {
      god_id: god_id
    }))
  },
  DELETE_MY_GOD(state, god_id) { // 移除这个god
    state.myGods = _.without(state.myGods, _.findWhere(state.myGods, {
      id: god_id
    }))
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
  filter_god_messages(state, god_name) { // 从主线messages中把god message 过滤出来，避免页面空白
    initGodMessage(state, god_name)
    if (state.messages.length !== 0 && state.gods_messages[god_name].length === 0) {
      let godMessages = _.filter(state.messages, (d) => {
        return d.god_name === god_name
      })
      state.gods_messages[god_name] = godMessages
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
  SET_EXPLORE_new_messages(state, god_name, messages) {
    state.explore_messages = _.uniq(
      state.explore_messages.concat(messages), false,
      function(item, key, a) {
        return item.id
      }
    )
  },

  SET_GOD_INFO(state, god_info) {
    state.god_info = god_info
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
    return axios.get('/api_no_types')
      .then((response) => {
        state.no_types = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
  },
  setNoTypes({
    state,
    commit,
    dispatch
  }, no_types) {
    state.no_types = no_types
    return axios.put('/api_no_types', no_types)
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
  }, god_id) {
    let parm = {
      god_id: god_id
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
    god_name,
    searchKey,
    after,
    limit,
    explore
  }) {
    commit('new_loading', true)
    var params = {
      not: state.no_types,
      limit: limit,
      after: after,
      god_name: god_name,
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
            commit('SET_EXPLORE_new_messages', data.messages)
          } else if (searchKey) { // search
            commit('SET_NEW_SEARCH_MESSAGES', data.messages)
          } else { // main
            commit('SET_new_messages', data.messages)
            // commit('REFRESH_UNREAD_MESSAGE_COUNT')
          }
        }
        commit('new_loading', false)
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
      followed: true
    }
    let gods = state.cat_my_gods[cat]
    if (gods && gods.length > 0) {
      params.before = gods[gods.length - 1].created_at
    }
    return axios.get('/api_gods', {
        params: params
      })
      .then(function(response) {
        commit('SET_cat_my_gods', {
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
    let god_name
    if (typeof val === 'string') {
      god_name = val
    } else {
      god_name = val.god_name
      // loading = val.loading
    }
    if (state.god_infos[god_name]) {
      return
    }
    return axios.get('/api_god', {
        params: {
          god_name: god_name
        }
      })
      .then(function(response) {
        commit('god_infos', response.data)
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
