<template>
  <q-list class="list">
    <QItem item v-for="cat in Object.keys(cats)" :key="cat" tag="label" class="item item-link" :class="{'active': $route.params.cat === cat}" :to="{'name': routeName, params: {'cat': cat}}">
      <q-item-side :icon="getIcon(cat)" />
      <q-item-main>
        <q-item-tile label>{{cat}}</q-item-tile>
        <q-item-tile sublabel>{{getSublabel(cat)}}</q-item-tile>
      </q-item-main>
    </QItem>
  </q-list>
</template>

<script>
  export default {
    components: {
    },
    props: {
      justMy: {
        type: Number,
        default: 0
      },
      routeName: {
        type: String
      }
    },
    computed: {
      theRoute () {
        return this.$route.name
      },
      cats: function() {
        if (this.justMy) {
          return this.$store.state.god.myCats
        } else {
          return this.$store.state.god.cats
        }
      },
      link: function() {
        if (this.justMy) {
          return 'MyGods'
        } else {
          return 'Recommand'
        }
      }
    },
    data: function() {
      return {
        iconMap: [{
            name: '有趣',
            icon: 'thumbUp'
          },
          {
            name: '动漫',
            icon: 'palette'
          },
          {
            name: '投资',
            icon: 'attachMoney'
          },
          {
            name: '旅游',
            icon: 'cardTravel'
          },
          {
            name: '游戏',
            icon: 'games'
          },
          {
            name: 'IT',
            icon: 'importantDevices'
          },
          {
            name: '大杂烩',
            icon: 'viewModule'
          },
          {
            name: '18+',
            icon: 'flightTakeoff'
          },
          {
            name: '官方',
            icon: 'copyright'
          },
          {
            name: '科技',
            icon: 'laptopMac'
          },
          {
            name: '美女',
            icon: 'favoriteBorder'
          },
          {
            name: '前端',
            icon: 'web'
          },
          {
            name: '自然界',
            icon: 'cropOriginal'
          },
          {
            name: '艺术',
            icon: 'artTrack'
          },
          {
            name: '新闻',
            icon: 'fiberNew'
          },
          {
            name: '美剧',
            icon: 'movie'
          },
          {
            name: '个人',
            icon: 'accountCircle'
          },
          {
            name: '摄影',
            icon: 'photoCamera'
          },
          {
            name: '程序员',
            icon: 'code'
          },
          {
            name: '明星',
            icon: 'star'
          },
          {
            name: '阅读',
            icon: 'book'
          },
          {
            name: '互联网',
            icon: 'language'
          }
        ],
        inputCat: '',
        addCatInputStat: false
      }
    },
    methods: {
      getSublabel: function(cat) {
        if (this.justMy) {
          return `关注${this.cats[cat]}人`
        } else {
          return `收录${this.cats[cat]}人`
        }
      },
      getIcon: function(cat) {
        let iconObj = this.iconMap.filter(function(d) {
          return d.name === cat
        })
        if (iconObj.length) {
          return iconObj[0].icon
        }
        return 'labelOutline'
      },
      showAddCatInput: function() {
        this.addCatInputStat = true
        this.inputCat = '' // 清空上次的输入
        this.$nextTick()
      },
      addCat: function() {
        // window.alert(this.inputCat)
        this.cats.splice(0, 0, {
          cat: this.inputCat
        })
        this.addCatInputStat = false
        this.$router.push({
          name: this.routeName,
          params: {
            cat: this.inputCat
          }
        })
      },
      selectCat: function() {
        this.$router.push({
          name: this.routeName,
          params: {
            cat: this.$route.params.cat
          }
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .list
    border 0
  .item.active
    background rgba(0, 0, 0, .03)

  .list
    background #fff;
  /* 对齐右边 */

  .row>.list {
    margin-right: 1rem;
  }
</style>
