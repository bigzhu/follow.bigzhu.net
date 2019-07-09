import axios from 'axios'
/*
export const someAction = (state) => {
}
*/
export const postAnki = ({
  state,
  commit,
  dispatch
}, params) => {
  return axios.post('/api/ankis', params)
}
export const getAnki = ({
  state,
  commit,
  dispatch
}) => {
  return axios.get('/api/ankis')
    .then((response) => {
      if (response.data !== null) {
        commit('anki', response.data)
      }
      return response.data
    })
}
export const loginAnki = ({
  state,
  commit,
  dispatch
}, anki) => {
  return axios.post('/api_login_anki', anki)
}
