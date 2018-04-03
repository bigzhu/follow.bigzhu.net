<template>
  <q-page padding>
    <NotYetFollow v-show="ordered_myGods.length===0 && get_done && !cat"></NotYetFollow>

    <q-infinite-scroll :offset="1000" :handler="loadMore">
      <AddingGodItem v-show="godName!==''" :godName="godName" @add_done="addDone">
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
  import {
    QInfiniteScroll
  } from 'quasar'
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
      'unfollow': function(godID) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', godID)
      }
    },
    watch: {
      '$route.params': {
        handler: function() {
          this.$store.dispatch('getMyGods', this.cat)
        },
        deep: true
      }
    },
    props: [],
    components: {
      Top,
      QInfiniteScroll,
      NotYetFollow,
      SpinnerBz,
      AddingGodItem,
      AddGodButton,
      AddGod,
      GodItem
    },
    computed: {
      loading() {
        return this.$store.state.p.loading
      },
      cat: function() {
        return this.$route.params.cat
      },
      filtered_myGods: function() {
        var self = this
        return self.myGods.filter(function(myGod) {
          return myGod.name.indexOf(self.key) !== -1
        })
      },
      ordered_myGods: function() {
        return _.orderBy(this.filtered_myGods, 'followed_at', 'desc').filter((o) => {
          return o.name !== this.godName
        })
      },
      myGods() {
        if (this.$store.state.cat_myGods[this.cat]) {
          return this.$store.state.cat_myGods[this.cat]
        } else {
          return []
        }
      }
    },
    data: function() {
      return {
        get_done: false,
        godName: '',
        key: ''
      }
    },
    mounted() {},
    methods: {
      addDone() {
        this.godName = ''
        this.$store.dispatch('getCat', 1)
        // 有可能引起关注数或类型增加, 取 cat
      },
      loadMore: function(index, done) {
        this.$store.dispatch('getMyGods', this.cat).then(function() {
          setTimeout(done, 1000)
        })
      },
      add: function(godName) {
        this.godName = godName
      }
    }
  }
</script>

<style scoped>
  .floating-label {
    width: 30%;
  }
</style>
