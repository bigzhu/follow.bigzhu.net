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
// 所有的社交类型重新组合存储 {influencer_id: {'twitter':{}}} 的格式
// 为了便于检索和对应
export const influencer_socials = (state, influencer_socials) => {
  _.map(influencer_socials, (o) => {
    if (state.map_influencer_socials[o.influencer_id.toString()] === undefined) {
      state.map_influencer_socials[o.influencer_id.toString()] = {}
    }
    // 如果有同步错误, 名字设置为空
    if (o.error_info !== '') {
      o.social_name = ''
    }
    state.map_influencer_socials[o.influencer_id.toString()][o.social] = o
  })
  state.influencer_socials = influencer_socials
}
// 和上面不一样, 这里铺平
export const influencers = (state, influencers) => {
  _.map(influencers, (o) => {
    state.influencer_name_ids[o.name] = o.id.toString() // 根据 name 快速索引 id
    state.map_influencers[o.id.toString()] = o
  })
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
export const countCat = (state, influencers) => {
  state.cats = {}
  influencers.map((o) => {
    if (!state.cats[o.cat]) {
      state.cats[o.cat] = 1
    } else {
      state.cats[o.cat] += 1
    }
  })
}
// 过滤统计我关注的网红的分类和数目
export const countFollowedCat = (state, influencers) => {
  state.my_cats = {}
  influencers.map((o) => {
    if (o.following === 0) return
    if (!state.my_cats[o.cat]) {
      state.my_cats[o.cat] = 1
    } else {
      console.log('add count')
      state.my_cats[o.cat] += 1
    }
  })
}
export const unshift_my_god = (state, {
  cat,
  god
}) => {
  state.cat_my_gods[cat].unshift(god)
}
