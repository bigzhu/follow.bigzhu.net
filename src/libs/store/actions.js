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
  axios.get('/APIUserInfo')
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
  return axios.post('/APILogin', params)
    .then(function(response) {
      return response.data
    })
}
