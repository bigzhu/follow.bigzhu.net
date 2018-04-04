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
export const cat_my_gods = (state, {
  cat,
  gods
}) => {
  initCatGod(state, 'cat_my_gods', cat)
  let mergeGods = state.cat_my_gods[cat].concat(gods)
  let uniqGods = _.uniqBy(mergeGods, function(d) {
    return d.id
  })
  state.cat_my_gods[cat] = uniqGods
}
export const god_infos = (state, god_info) => {
  Vue.set(state.god_infos, god_info.name, god_info)
}
export const cat_gods = (state, {
  cat,
  gods
}) => {
  initCatGod(state, 'cat_gods', cat)
  let mergeGods = state.cat_gods[cat].concat(gods)
  let uniqGods = _.uniqBy(mergeGods, function(d) {
    return d.id
  })
  state.cat_gods[cat] = uniqGods
}
