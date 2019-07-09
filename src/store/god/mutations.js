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
// 所有的社交类型重新组合存储 {starID: {'twitter':{}}} 的格式
// 为了便于检索和对应
export const starSocials = (state, starSocials) => {
  _.map(starSocials, (o) => {
    if (state.mapStarSocials[o.starID.toString()] === undefined) {
      state.mapStarSocials[o.starID.toString()] = {}
    }
    // if (o.error_info !== '') {
    //   o.socialName = ''
    // }
    state.mapStarSocials[o.starID.toString()][o.social] = o
  })
  state.starSocials = starSocials
}
// 和上面不一样, 这里铺平
export const stars = (state, stars) => {
  _.map(stars, (o) => {
    state.starNameIDS[o.name] = o.id.toString() // 根据 name 快速索引 id
    state.mapStars[o.id.toString()] = o
  })
  state.stars = stars
}
export const godInfos = (state, godInfo) => {
  Vue.set(state.godInfos, godInfo.name, godInfo)
}
export const catGods = (state, {
  cat,
  gods
}) => {
  initCatGod(state, 'catGods', cat)
  let mergeGods = state.catGods[cat].concat(gods)
  let uniqGods = _.uniqBy(mergeGods, function(d) {
    return d.id
  })
  state.catGods[cat] = uniqGods
}
export const countCat = (state, stars) => {
  state.cats = {}
  stars.map((o) => {
    if (!state.cats[o.cat]) {
      state.cats[o.cat] = 1
    } else {
      state.cats[o.cat] += 1
    }
  })
}
// 过滤统计我关注的网红的分类和数目
export const countFollowedCat = (state, stars) => {
  state.myCats = {}
  stars.map((o) => {
    if (o.following === 0) return
    if (!state.myCats[o.cat]) {
      state.myCats[o.cat] = 1
    } else {
      console.log('add count')
      state.myCats[o.cat] += 1
    }
  })
}
export const unshiftMyGod = (state, {
  cat,
  god
}) => {
  state.catMyGods[cat].unshift(god)
}
