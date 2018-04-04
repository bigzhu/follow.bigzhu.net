import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getOauthInfo = ({
  state,
  commit,
  dispatch
}) => {
  axios.get('/api_oauth_info')
    .then(function(response) {
      commit('SET_OAUTH_INFO', response.data)
      return response.data
    })
}
export const login = ({
  state,
  commit,
  dispatch
}, {
  user_name,
  password
}) => {
  let params = {}
  params.user_name = user_name
  params.password = password
  return axios.post('/api_login', params)
    .then(function(response) {
      return response.data
    })
}
