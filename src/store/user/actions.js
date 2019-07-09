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
  return axios.get('/api_noTypes')
    .then((response) => {
      commit('noTypes', response.data)
      return response.data
    })
    .catch(function (error) {
      console.log(error)
    })
}
