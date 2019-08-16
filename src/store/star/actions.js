import axios from 'axios'
import setStorage from '../../functions/setStorage'
import getStorage from '../../functions/getStorage'
/*
export const someAction = (state) => {
}
*/
import { get, del, post, put } from 'bz-q-lib/src/functions/http'

export const getStarSocials = ({ state, commit, dispatch }) => {
  let value = getStorage('starSocials')
  if (value !== null) {
    commit('starSocials', value)
    dispatch('getServerStarSocials')
  } else {
    return dispatch('getServerStarSocials')
  }
}
export const getServerStarSocials = ({ state, commit, dispatch }) => {
  return get('/api/starSocials', {}).then((data) => {
    commit('starSocials', data)
    setStorage('starSocials', data)
    return data
  })
}
export const getStars = ({ state, commit, dispatch }) => {
  let value = getStorage('stars')
  if (value !== null) {
    commit('stars', value)
    dispatch('getServerStars')
  } else {
    return dispatch('getServerStars')
  }
}
// 从服务器获取 stars 信息
export const getServerStars = ({ state, commit, dispatch }) => {
  return get('/api/stars', {}).then((data) => {
    commit('stars', data)
    commit('countCat', data)
    commit('countFollowedCat', data)
    setStorage('stars', data)
    return data
  })
}

export const getStar = ({ state, commit, dispatch }, val) => {
  let StarName
  if (typeof val === 'string') {
    StarName = val
  } else {
    StarName = val.StarName
    // loading = val.loading
  }
  if (state.starInfos[StarName]) {
    return
  }
  return get('/apiStar', {
    StarName: StarName
  })
    .then((data) => {
      commit('starInfos', data)
      return data
    })
}
export const getPublicStars = ({ state, commit, dispatch }, cat) => {
  let params = {
    cat: cat
  }
  let stars = state.catStars[cat]
  if (stars) {
    params.before = stars[stars.length - 1].CreatedAt
  }
  return axios.get('/apiStars', {
    params: params
  })
    .then(function (response) {
      commit('catStars', {
        cat: cat,
        stars: response.data
      })
      return response.data
    })
}
export const putStarSocial = ({ dispatch, state, actions }, modifyStarSocial) => {
  return put('/api/starSocials', modifyStarSocial)
}
export const unfollow = ({ state, commit, dispatch }, StarID) => {
  return del('/api/followers/' + StarID)
}
export const follow = ({ state, commit, dispatch }, StarID) => {
  let params = {
    StarID: StarID
  }
  return post('/api/followers', params)
}
export const postStar = ({ state, commit, dispatch }, { name, cat }) => {
  let params = {
    name: name,
    cat: cat
  }
  return post('/api/stars', params)
}

export const checkSocial = ({ state, commit, dispatch }, { name, type }) => {
  let params = {
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

export const UpdateRemark = ({ state, commit, dispatch }, params) => {
  return put('/api/' + 'remarks', params)
}
