import axios from 'axios'
/*
export const someAction = (state) => {
}
*/
export const getInfluencerSocials = ({
  state,
  commit,
  dispatch
}) => {
  return axios.get('/APIGetInfluencerSocials')
    .then(function(response) {
      commit('influencer_socials', response.data)
      return response.data
    })
}
export const getInfluencers = ({
  state,
  commit,
  dispatch
}) => {
  return axios.get('/APIGetInfluencers')
    .then(function(response) {
      commit('influencers', response.data)
      commit('countCat', response.data)
      commit('countFollowedCat', response.data)
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
      return response.data
    })
}
export const putInfluencerSocial = ({
  dispatch,
  state,
  actions
}, modify_influencer_social) => {
  return axios.put('/APIUpdateInfluencerSocial', modify_influencer_social)
}
export const unfollow = ({
  state,
  commit,
  dispatch
}, influencer_id) => {
  return axios.delete('/APIUnFollow', {
    params: {
      influencer_id: influencer_id
    }
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
  return axios.post('/APIFollow', params)
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
  return axios.post('/APIAddInfluencer', params)
    .then(function(response) {
      return response.data
    })
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
