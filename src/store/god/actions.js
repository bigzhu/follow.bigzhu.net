import axios from 'axios'
/*
export const someAction = (state) => {
}
*/
import {
  get,
  del,
  post,
  put
} from 'bz-q-lib/src/functions/http'
export const getStarSocials = ({
  state,
  commit,
  dispatch
}) => {
  return get('/api/star_socials', {}).then((data) => {
    commit('star_socials', data)
    return data
  })
}
export const getStars = ({
  state,
  commit,
  dispatch
}) => {
  return get('/api/GetStars', {}).then((data) => {
    commit('stars', data)
    commit('countCat', data)
    commit('countFollowedCat', data)
    return data
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
  return get('/api_god', {
      god_name: god_name
    })
    .then((data) => {
      commit('god_infos', data)
      return data
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
      return response.data
    })
}
export const putStarSocial = ({
  dispatch,
  state,
  actions
}, modify_star_social) => {
  return put('/api/UpdateStarSocial', modify_star_social)
}
export const unfollow = ({
  state,
  commit,
  dispatch
}, star_id) => {
  return del('/api/UnFollow', {
    star_id: star_id
  })
}
export const follow = ({
  state,
  commit,
  dispatch
}, star_id) => {
  let params = {
    star_id: star_id
  }
  return post('/api/Follow', params)
}
export const postGod = ({
  state,
  commit,
  dispatch
}, {
  name,
  cat
}) => {
  var params = {
    name: name,
    cat: cat
  }
  return post('/api/AddStar', params)
}

export const checkSocial = ({
  state,
  commit,
  dispatch
}, {
  name,
  type
}) => {
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
}

export const UpdateRemark = ({
  state,
  commit,
  dispatch
}, params) => {
  return put('/api/' + 'UpdateRemark', params)
}
