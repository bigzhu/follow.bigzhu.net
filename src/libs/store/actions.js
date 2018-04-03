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
  userName,
  password
}) => {
  let params = {}
  params.user_name = userName
  params.password = password
  return axios.post('/api_login', params)
    .then(function(response) {
      return response.data
    })
}
