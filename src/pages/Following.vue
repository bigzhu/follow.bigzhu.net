<template>
  <q-page padding>
    <NotYetFollow v-show="orderedStars.length===0 && getDone && !cat"></NotYetFollow>
    <AddingStarItem v-show="StarName!==''" :StarName="StarName" @addDone="addDone">
    </AddingStarItem>
    <StarItem v-for="god in orderedStars" :god="god" :key="god.id" class="god-item">
    </StarItem>
    <AddStarButton v-on:add="add"></AddStarButton>
    <Top></Top>
  </q-page>
</template>

<script>
  import Top from '../components/Top'
  import NotYetFollow from '../components/NotYetFollow'
  import AddingStarItem from '../components/AddingStarItem'
  import AddStarButton from '../components/AddStarButton'
  import _ from 'lodash'
  import StarItem from '../components/StarItem'
  export default {
    events: {
      'unfollow': function (godID) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', godID)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          this.$store.dispatch('getStars')
        },
        deep: true
      }
    },
    components: {
      Top,
      NotYetFollow,
      AddingStarItem,
      AddStarButton,
      StarItem
    },
    computed: {
      loading() {
        return this.$store.state.lib.loading
      },
      cat: function () {
        return this.$route.params.cat
      },
      // 过滤不是已经关注的网红
      filteredMy: function () {
        return this.filterCat.filter((o) => {
          return o.following !== 0
        })
      },
      // 按照关注时间排序
      orderedStars: function () {
        return _.orderBy(this.filteredMy, 'followingAt', 'desc').filter((o) => {
          return o.name !== this.StarName
        })
      },
      filterCat() {
        return this.stars.filter((o) => {
          return o.Cat === this.cat || !this.cat
        })
      },
      stars() {
        return this.$store.state.god.stars
      }
    },
    data: function () {
      return {
        getDone: false,
        StarName: '',
        key: ''
      }
    },
    mounted() {
      this.$store.dispatch('getStarSocials')
      this.$store.dispatch('getStars')
    },
    methods: {
      addDone() {
        this.StarName = ''
        this.$store.dispatch('getCat', 1)
        // 有可能引起关注数或类型增加, 取 cat
      },
      add: function (StarName) {
        this.StarName = StarName
      }
    }
  }
</script>

<style lang="stylus" scoped>
// god 直接留出间距
  .q-card
    margin 0.5rem
  .floating-label
    width 30%
</style>
