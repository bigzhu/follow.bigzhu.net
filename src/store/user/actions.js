import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getOauthInfo = (state) => {
  return axios.get('/api/UserInfo')
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

export const getNoTypes = ({
  state,
  commit,
  dispatch
}) => {
  return axios.get('/api_no_types')
    .then((response) => {
      commit('no_types', response.data)
      return response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}

export const getRegisteredCount = ({
  state,
  commit,
  dispatch
}, status) => {
  return axios.get('/api_registered')
    .then(function(response) {
      commit('registered_count', response.data.registered_count)
      return response.data.registered_count
    })
}
