export default {
  mapStarSocials: {}, // 所有网红社交帐号
  starSocials: [],
  mapStars: {}, // 所有网红, id 做 key
  StarNameIDS: {}, // 根据 star name 快速索引 id
  stars: [], // 所有网红
  starInfo: {},
  myCats: {}, // star 我的类别
  followingStarCount: -1, // 关注的star数
  cats: {}, // star 的类别
  bigStars: [],
  catStars: {}, // 按 cat 分类的stars
  starIsExists: true, // 标记star是否存在
  starInfos: {}, // 查询的每个star信息存放在这里
  nowStar: { name: 'bigzhu', percentCenter: 100 } // 当前正在浏览的发消息 message 的人
}
