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

export const getNoTypes = (state) => {
  return axios.get('/api_no_types')
    .then((response) => {
      state.no_types = response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}
export const getMyGods = ({
  state,
  commit,
  dispatch
}, cat) => {
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
      commit('cat_my_gods', {
        cat: cat,
        gods: response.data
      })
      return response.data
    })
}
export const getGod = ({
  state,
  commit,
  dispatch
}, val) => {
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
}
export const getPublicGods = ({
  state,
  commit,
  dispatch
}, cat) => {
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
      commit('cat_gods', {
        cat: cat,
        gods: response.data
      })
    })
}
export const putGod = ({
  dispatch,
  state,
  actions
}, god) => {
  var params = god
  return axios.put('/api_god', params)
}
export const getCat = ({
  state,
  commit,
  dispatch
}, isMy) => {
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
      if (isMy) {
        commit('my_cats', response.data)
      } else {
        commit('cats', response.data)
      }
      return response.data
    })
}
