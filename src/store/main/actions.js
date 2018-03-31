import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getOauthInfo = (state) => {
  return axios.get('/api_oauth_info')
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

export const getNoTypes = (state) => {
  return axios.get('/api_no_types')
    .then((response) => {
      state.noTypes = response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}
