export default {
  mapStarSocials: {}, // 所有网红社交帐号
  starSocials: [],
  mapStars: {}, // 所有网红, id 做 key
  StarNameIDS: {}, // 根据 star name 快速索引 id
  stars: [], // 所有网红
  godInfo: {},
  myCats: {}, // god 我的类别
  followingGodCount: -1, // 关注的god数
  cats: {}, // god 的类别
  bigGods: [],
  catGods: {}, // 按 cat 分类的gods
  godIsExists: true, // 标记god是否存在
  godInfos: {}, // 查询的每个god信息存放在这里
  nowStar: { name: 'bigzhu', percentCenter: 100 } // 当前正在浏览的发消息 message 的人
}
