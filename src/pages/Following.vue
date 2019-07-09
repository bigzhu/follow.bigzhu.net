<template>
  <q-page padding>
    <NotYetFollow v-show="ordered_stars.length===0 && get_done && !cat"></NotYetFollow>
    <AddingGodItem v-show="star_name!==''" :star_name="star_name" @add_done="addDone">
    </AddingGodItem>
    <GodItem v-for="god in ordered_stars" :god="god" :key="god.id" class="god-item">
    </GodItem>
    <AddGodButton v-on:add="add"></AddGodButton>
    <Top></Top>
  </q-page>
</template>

<script>
  import Top from '../components/Top'
  import NotYetFollow from '../components/NotYetFollow'
  import AddingGodItem from '../components/AddingGodItem'
  import AddGodButton from '../components/AddGodButton'
  import _ from 'lodash'
  import GodItem from '../components/GodItem'
  import AddGod from '../components/AddGod'
  export default {
    events: {
      'unfollow': function(god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', god_id)
      }
    },
    watch: {
      '$route.params': {
        handler: function() {
          this.$store.dispatch('getStars')
        },
        deep: true
      }
    },
    components: {
      Top,
      NotYetFollow,
      AddingGodItem,
      AddGodButton,
      AddGod,
      GodItem
    },
    computed: {
      loading() {
        return this.$store.state.lib.loading
      },
      cat: function() {
        return this.$route.params.cat
      },
      // 过滤不是已经关注的网红
      filtered_my: function() {
        return this.filter_cat.filter((o) => {
          return o.following !== 0
        })
      },
      // 按照关注时间排序
      ordered_stars: function() {
        return _.orderBy(this.filtered_my, 'following_at', 'desc').filter((o) => {
          return o.name !== this.star_name
        })
      },
      filter_cat() {
        return this.stars.filter((o) => {
          return o.cat === this.cat || !this.cat
        })
      },
      stars() {
        return this.$store.state.god.stars
      }
    },
    data: function() {
      return {
        get_done: false,
        star_name: '',
        key: ''
      }
    },
    mounted() {
      this.$store.dispatch('getStarSocials')
      this.$store.dispatch('getStars')
    },
    methods: {
      addDone() {
        this.star_name = ''
        this.$store.dispatch('getCat', 1)
        // 有可能引起关注数或类型增加, 取 cat
      },
      add: function(star_name) {
        this.star_name = star_name
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
