import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getOauthInfo = (state) => {
  axios.get('/api_oauth_info')
    .then(function(response) {
      let data = response.data
      if (!data.error) {
        state.oauthInfo = data
        return data
      } else {
        console.log(response)
      }
    })
    .catch(function(error) {
      console.log(error)
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
      .catch(function(error) {
        console.log(error)
      })
  }
