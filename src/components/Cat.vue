<template>
  <q-list class="list">
    <q-item clickable v-ripple v-for="cat in Object.keys(cats)" :key="cat" tag="label" class="item item-link" :class="{'active': $route.params.cat === cat}" :to="{'name': routeName, params: {'cat': cat}}">
      <q-item-section avatar>
        <q-icon :color="cat==='NSFW'?'red':''" :name="getIcon(cat)" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{cat===''?'all':cat}}</q-item-label>
        <q-item-label caption>{{getSublabel(cat)}}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    components: {},
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
      theRoute() {
        return this.$route.name
      },
      cats: function () {
        if (this.justMy) {
          return this.$store.state.god.myCats
        } else {
          return this.$store.state.god.cats
        }
      },
      link: function () {
        if (this.justMy) {
          return 'MyStars'
        } else {
          return 'Recommand'
        }
      }
    },
    data: function () {
      return {
        iconMap: [{
            name: 'Fun',
            icon: 'thumb_up'
          },
          {
            name: 'ACG',
            icon: 'palette'
          },
          {
            name: 'ProgrammingLanguage',
            icon: 'fa fa-python'
          },
          {
            name: 'Immigrant',
            icon: 'fa fa-suitcase-rolling'
          },
          {
            name: 'NSFW',
            icon: 'fa fa-grin-hearts'
          },
          {
            name: 'Blockchain',
            icon: 'fa fa-link'
          },
          {
            name: 'Mishmash',
            icon: 'fa fa-question'
          },
          {
            name: 'Model',
            icon: 'fa fa-heart'
          },
          {
            name: 'IT',
            icon: 'fa fa-info'
          },
          {
            name: 'Star',
            icon: 'fa fa-star'
          },
          {
            name: 'Fitness',
            icon: 'fa fa-dumbbell'
          },
          {
            name: 'Rich',
            icon: 'fa fa-dollar-sign'
          },
          {
            name: 'World',
            icon: 'fa fa-globe-asia'
          },
          {
            name: 'Photographer',
            icon: 'photo_camera'
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
            name: 'Programmer',
            icon: 'fa fa-code'
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
            name: 'IT',
            icon: 'language'
          }
        ],
        inputCat: '',
        addCatInputStat: false
      }
    },
    methods: {
      getSublabel: function (cat) {
        if (this.justMy) {
          return `关注${this.cats[cat]}人`
        } else {
          return `收录${this.cats[cat]}人`
        }
      },
      getIcon: function (cat) {
        let iconObj = this.iconMap.filter(function (d) {
          return d.name === cat
        })
        if (iconObj.length) {
          return iconObj[0].icon
        }
        return 'labelOutline'
      },
      showAddCatInput: function () {
        this.addCatInputStat = true
        this.inputCat = '' // 清空上次的输入
        this.$nextTick()
      },
      addCat: function () {
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
      selectCat: function () {
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
