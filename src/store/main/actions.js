import axios from 'axios'
/*
export const someAction = (state) => {
}
*/

export const getNoTypes = (state) => {
  return axios.get('/api_no_types')
    .then((response) => {
      state.no_types = response.data
    })
    .catch(function(error) {
      console.log(error)
    })
}
