export default {
  newLoading: false,
  oldLoading: false,
  showHowToUseCollect: false, // 是否显示收藏引导
  starsMessages: {},
  unreadMessageCount: 0,
  theMessage: {
    avatar: '',
    StarName: 'bigzhu',
    id: 0
  }, // 显示某个message
  localUnreadMessageCount: 0, // 取过来还未读的信息
  searchMessages: [], // 查找的messages
  messages: [],
  exploreMessages: [], // 探索的
  collectMessages: [] // 收藏的
}
