/*
export const someMutation = (state) => {
}
*/
import Vue from 'vue'
import _ from 'lodash'

function initCatGod(state, type, cat) {
  if (state[type][cat] === undefined) {
    Vue.set(state[type], cat, [])
  }
}
export const CAT_MY_GODS = (state, {
  cat,
  gods
}) => {
  initCatGod(state, 'catMyGods', cat)
  let mergeGods = state.catMyGods[cat].concat(gods)
  let uniqGods = _.uniqBy(mergeGods, function(d) {
    return d.id
  })
  state.catMyGods[cat] = uniqGods
}
