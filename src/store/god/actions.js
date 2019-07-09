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
  return get('/api/starSocials', {}).then((data) => {
    commit('starSocials', data)
    return data
  })
}
export const getStars = ({
  state,
  commit,
  dispatch
}) => {
  return get('/api/stars', {}).then((data) => {
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
  return get('/api_god', {
      starName: starName
    })
    .then((data) => {
      commit('godInfos', data)
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
  let gods = state.catGods[cat]
  if (gods) {
    params.before = gods[gods.length - 1].created_at
  }
  return axios.get('/api_gods', {
      params: params
    })
    .then(function(response) {
      commit('catGods', {
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
}, modifyStarSocial) => {
  return put('/api/starSocials', modifyStarSocial)
}
export const unfollow = ({
  state,
  commit,
  dispatch
}, starID) => {
  return del('/api/followers/' + starID)
}
export const follow = ({
  state,
  commit,
  dispatch
}, starID) => {
  let params = {
    starID: starID
  }
  return post('/api/followers', params)
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
  return post('/api/stars', params)
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
  return axios.get('/socials', {
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
  return put('/api/' + 'remarks', params)
}
