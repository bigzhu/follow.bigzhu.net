/*
export const someMutation = (state) => {
}
*/
import Vue from 'vue'
import _ from 'lodash'

function initCatStar(state, type, cat) {
  if (state[type][cat] === undefined) {
    Vue.set(state[type], cat, [])
  }
}

export const setNowStarForce = (state, name) => {
  state.nowStar.name = name
}
export const setNowStar = (state, nowStar) => {
  if (nowStar.percentCenter < 0) nowStar.percentCenter = 100
  if (state.nowStar.name === nowStar.name) state.nowStar.percentCenter = nowStar.percentCenter
  if (state.nowStar.percentCenter > nowStar.percentCenter) {
    state.nowStar.name = nowStar.name
    state.nowStar.percentCenter = nowStar.percentCenter
  }
}
// 所有的社交类型重新组合存储 {StarID: {'twitter':{}}} 的格式
// 为了便于检索和对应
export const starSocials = (state, starSocials) => {
  _.map(starSocials, (o) => {
    if (state.mapStarSocials[o.StarID.toString()] === undefined) {
      state.mapStarSocials[o.StarID.toString()] = {}
    }
    // if (o.errorInfo !== '') {
    //   o.socialName = ''
    // }
    state.mapStarSocials[o.StarID.toString()][o.Social] = o
  })
  state.starSocials = starSocials
}
// 和上面不一样, 这里铺平
export const stars = (state, stars) => {
  _.map(stars, (o) => {
    state.StarNameIDS[o.Name] = o.ID.toString() // 根据 name 快速索引 id
    state.mapStars[o.ID.toString()] = o
  })
  state.stars = stars
}
export const starInfos = (state, starInfo) => {
  Vue.set(state.starInfos, starInfo.Name, starInfo)
}
export const catStars = (state, {
  cat,
  stars
}) => {
  initCatStar(state, 'catStars', cat)
  let mergeStars = state.catStars[cat].concat(stars)
  let uniqStars = _.uniqBy(mergeStars, function(d) {
    return d.id
  })
  state.catStars[cat] = uniqStars
}
export const countCat = (state, stars) => {
  state.cats = {}
  stars.map((o) => {
    if (!state.cats[o.Cat]) {
      state.cats[o.Cat] = 1
    } else {
      state.cats[o.Cat] += 1
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
      state.myCats[o.cat] += 1
    }
  })
}
export const unshiftMyStar = (state, {
  cat,
  star
}) => {
  state.catMyStars[cat].unshift(star)
}
