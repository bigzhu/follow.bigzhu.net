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
export const getInfluencerSocials = ({
  state,
  commit,
  dispatch
}) => {
  return get('/api/GetInfluencerSocials', {}).then((data) => {
    commit('influencer_socials', data)
    return data
  })
}
export const getInfluencers = ({
  state,
  commit,
  dispatch
}) => {
  return get('/api/GetInfluencers', {}).then((data) => {
    commit('influencers', data)
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
export const putInfluencerSocial = ({
  dispatch,
  state,
  actions
}, modify_influencer_social) => {
  return put('/api/UpdateInfluencerSocial', modify_influencer_social)
}
export const unfollow = ({
  state,
  commit,
  dispatch
}, influencer_id) => {
  return del('/api/UnFollow', {
    influencer_id: influencer_id
  })
}
export const follow = ({
  state,
  commit,
  dispatch
}, influencer_id) => {
  let params = {
    influencer_id: influencer_id
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
  return post('/api/AddInfluencer', params)
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
