import axios from 'axios'
import {
  // del,
  // post,
  // put,
  // get
} from 'bz-q-lib/src/functions/http'

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
