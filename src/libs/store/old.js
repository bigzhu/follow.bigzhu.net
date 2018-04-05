// store 的module
// import 'whatwg-fetch'
import _ from 'lodash'
import checkLogin from './functions/checkLogin'
// import toast from './functions/toast'
import axios from 'axios'

var fetch
fetch = global.window.fetch
// if (global.window) {
//   fetch = global.window.fetch
// } else {
//   fetch = require('node-fetch')
// }

// state
export const state = {
  is_login: false,
  site: null, // 在ssr的时候，用来定义网站。
  rich_list: [],
  rich_text: {},
  oauth_info: {
    name: ''
  },
  user_info: {
    user_name: '',
    picture: ''
  },
  loading: false,
  error_info: '',
  info: ''
}
// mutations
export const mutations = {
  CHECK_LOGIN(state) {
    state.is_login = checkLogin()
  },
  SET_SITE(state, site) {
    state.site = site
  },
  SET_INFO(state, info) {
    state.info = info
  },
  SET_SHORT_LIFE_INFO(state, info, time = 1000) {
    state.info = info
    setTimeout(
      () => {
        state.info = ''
      }, time
    )
  },
  CLEAN_RICH_TEXT(state) {
    state.rich_text = {}
  },
  SET_RICH_TEXT(state, rich_text) {
    state.rich_text = rich_text
  },
  SET_RICH_LIST(state, rich_list) {
    state.rich_list = _.unionBy(state.rich_list, rich_list, 'id')
    // state.rich_list = rich_list
  },
  SET_USER_INFO(state, user_info) {
    state.user_info = user_info
  },

  SET_ERROR_INFO(state, error_info) {
    state.error_info = error_info
  },
  SET_SHORT_LIFE_ERROR_INFO(state, error_info, time = 1000) {
    state.error_info = error_info
    setTimeout(
      () => {
        state.error_info = ''
      }, time
    )
  }
}
// actions
export const actions = {
  getOper({
    state,
    commit,
    dispatch
  }, name) { // 根据名字来操作
    return dispatch('get', '/api_' + name).then(function(data) {
      state[name + 's'] = data.datas
      return data
    })
  },
  get({
    state,
    commit
  }, val) {
    let url = ''
    let loading = true
    let hide_error = false
    if (typeof val === 'string') {
      url = val
    } else {
      if (val.body) {
        url = val.url + '/' + JSON.stringify(val.body)
      } else {
        url = val.url
      }
      loading = val.loading
      hide_error = val.hide_error
    }

    if (state.site) url = state.site + url
    // console.log(url)

    if (loading === true || loading === undefined) {
      commit('loading', true)
    }
    return fetch(url, {
        credentials: 'same-origin',
        method: 'get',
        headers: {
          'pragma': 'no-cache',
          'cache-control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        if (loading === true || loading === undefined) {
          commit('loading', false)
        }
        return response
      }).then(function(response) {
        if (response.status !== 200) {
          throw new Error(response.url + ' ' + response.status + ' ' + response.statusText)
        }
        return response.json()
      }).then(function(data) {
        if (data.error !== '0' && !hide_error) {
          commit('SET_ERROR_INFO', data.error)
          throw new Error(data.error)
        }
        return data
      }).catch(function(error) {
        console.log(error.message)
        // toast(error.message, 'warning')
      })
  },
  post({
    state,
    commit
  }, {
    url,
    body,
    no_throw,
    loading
  }) {
    if (loading === true || loading === undefined) {
      commit('loading', true)
    }
    return fetch(url, {
        credentials: 'same-origin',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(function(response) {
        if (loading === true || loading === undefined) {
          commit('loading', false)
        }
        return response
      }).then(function(response) {
        if (response.status !== 200) {
          throw new Error(response.url + ' ' + response.status + ' ' + response.statusText)
        }
        return response.json()
      }).then(function(data) {
        if (data.error !== '0' && !no_throw) {
          commit('SET_ERROR_INFO', data.error)
          console.log(url + ' error: ' + data.error)
          throw new Error(data.error)
        }
        return data
      }).catch(function(error) {
        console.log(error.message)
        // toast(error.message, 'warning')
      })
  },
  delete({
    state,
    commit
  }, url) {
    commit('loading', true)
    return fetch(url, {
        credentials: 'same-origin',
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(function(response) {
        commit('loading', false)
        return response
      }).then(function(response) {
        if (response.status !== 200) {
          throw new Error(response.url + ' ' + response.status + ' ' + response.statusText)
        }
        return response.json()
      }).then(function(data) {
        if (data.error !== '0') {
          commit('SET_ERROR_INFO', data.error)
          console.log(url + ' error: ' + data.error)
        }
        return data
      }).catch(function(error) {
        console.log(error.message)
        // toast(error.message, 'warning')
      })
  },
  put({
    state,
    commit
  }, {
    url,
    body,
    loading
  }) {
    if (loading === true || loading === undefined) {
      commit('loading', true)
    }
    return fetch(url, {
        credentials: 'same-origin',
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
      .then(function(response) {
        if (loading === true || loading === undefined) {
          commit('loading', false)
        }
        return response
      }).then(function(response) {
        if (response.status !== 200) {
          throw new Error(response.url + ' ' + response.status + ' ' + response.statusText)
        }
        return response.json()
      }).then(function(data) {
        if (data.error !== '0') {
          commit('SET_ERROR_INFO', data.error)
          console.log(url + ' error: ' + data.error)
          throw new Error(data.error)
        }
        return data
      }).catch(function(error) {
        console.log(error.message)
        // toast(error.message, 'warning')
      })
  },

  signup({
    state,
    commit
  }, user_name, password, email, done = null, error = null) {
    let parm = {}
    parm.user_name = user_name
    parm.password = password
    parm.email = email

    fetch('/api_signup', {
        credentials: 'same-origin',
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(parm)
      })
      .then(function(response) {
        return response
      }).then(function(response) {
        return response.json()
      }).then(function(data) {
        if (data.error !== '0') {
          throw new Error(data.error)
        }
        if (done) {
          done(data)
        }
      })
  },
  getOauthInfo({
    state,
    commit,
    dispatch
  }) {
    axios.get('/api_oauth_info')
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
  },
  getUserInfo({
    state,
    commit,
    dispatch
  }) {
    return dispatch('get', {
      url: '/api_user_info',
      hide_error: true
    }).then(function(data) {
      if (data.user_info) {
        commit('SET_USER_INFO', data.user_info)
      }
    })
  },
  getRichList({
    state,
    commit,
    dispatch
  }, full_url) {
    let parm = {
      'all': 1
    }
    let url = '/api_rich_text'

    return dispatch('get', {
      url: url,
      body: parm
    }).then(function(data) {
      commit('SET_RICH_LIST', data.rich_text)
      return data
    })
  },
  getRichText({
    state,
    commit,
    dispatch
  }, parm) {
    // id or key
    let url = '/api_rich_text'
    return dispatch('get', {
      url: url,
      body: parm
    }).then(function(data) {
      commit('SET_RICH_TEXT', data.rich_text[0])
      return data
    })
  }
}

// getters
export const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
