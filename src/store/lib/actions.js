
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
