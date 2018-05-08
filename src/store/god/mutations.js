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
export const influencers = (state, influencers) => {
  state.influencers = influencers
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
export const cats = (state, cats) => {
  state.cats = cats
}
export const my_cats = (state, my_cats) => {
  state.my_cats = my_cats
}
export const unshift_my_god = (state, {
  cat,
  god
}) => {
  state.cat_my_gods[cat].unshift(god)
}
