<template>
  <q-page padding>
    <NotYetFollow v-show="ordered_myGods.length===0 && get_done && !cat"></NotYetFollow>

    <q-infinite-scroll :offset="1000" :handler="loadMore">
      <AddingGodItem v-show="god_name!==''" :god_name="god_name" @add_done="addDone">
      </AddingGodItem>
      <GodItem v-for="god in ordered_myGods" :god="god" :key="god.id" class="god-item">
      </GodItem>
      <SpinnerBz :show="loading"></SpinnerBz>
    </q-infinite-scroll>
    <AddGodButton v-on:add="add"></AddGodButton>
    <Top></Top>
  </q-page>
</template>

<script>
  import Top from '../components/Top'
  import NotYetFollow from '../components/NotYetFollow'
  import SpinnerBz from '../components/SpinnerBz'
  import AddingGodItem from '../components/AddingGodItem'
  import AddGodButton from '../components/AddGodButton'
  import _ from 'lodash'
  import GodItem from '../components/GodItem'
  import AddGod from '../components/AddGod'
  export default {
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', god_id)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          this.$store.dispatch('getMyGods', this.cat)
        },
        deep: true
      }
    },
    props: [],
    components: {
      Top,
      NotYetFollow,
      SpinnerBz,
      AddingGodItem,
      AddGodButton,
      AddGod,
      GodItem
    },
    computed: {
      loading() {
        return this.$store.state.lib.loading
      },
      cat: function () {
        return this.$route.params.cat
      },
      filtered_myGods: function () {
        var self = this
        return self.myGods.filter(function (myGod) {
          return myGod.name.indexOf(self.key) !== -1
        })
      },
      ordered_myGods: function () {
        return _.orderBy(this.filtered_myGods, 'followed_at', 'desc').filter((o) => {
          return o.name !== this.god_name
        })
      },
      myGods() {
        if (this.$store.state.god.cat_my_gods[this.cat]) {
          return this.$store.state.god.cat_my_gods[this.cat]
        } else {
          return []
        }
      }
    },
    data: function () {
      return {
        get_done: false,
        god_name: '',
        key: ''
      }
    },
    mounted() {},
    methods: {
      addDone() {
        this.god_name = ''
        this.$store.dispatch('getCat', 1)
        // 有可能引起关注数或类型增加, 取 cat
      },
      loadMore: function (index, done) {
        this.$store.dispatch('getMyGods', this.cat).then(() => {
          setTimeout(done, 1000)
        })
      },
      add: function (god_name) {
        this.god_name = god_name
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
