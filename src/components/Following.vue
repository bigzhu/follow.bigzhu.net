<template>
  <div class="layout-padding">
    <NotYetFollow v-show="ordered_my_gods.length===0 && get_done && !cat"></NotYetFollow>
    <AddingGodItem v-show="god_name!==''" :god_name="god_name" @add_done="god_name=''">
    </AddingGodItem>

    <q-infinite-scroll :offset="1000" :handler="loadMore">
      <GodItem v-for="god in ordered_my_gods" :god="god" :key="god.id" class="god-item">
      </GodItem>
      <SpinnerBz :show="loading"></SpinnerBz>
    </q-infinite-scroll>
    <AddGodButton v-on:add="add"></AddGodButton>
    <Top></Top>
  </div>
</template>

<script>
  import {QInfiniteScroll} from 'quasar'
  import Top from './Top'
  import NotYetFollow from './NotYetFollow'
  import SpinnerBz from './SpinnerBz'
  import AddingGodItem from './AddingGodItem'
  import AddGodButton from './AddGodButton'
  import _ from 'lodash'
  import GodItem from './GodItem'
  import AddGod from './AddGod'
  export default {
    events: {
      'unfollow': function(god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', god_id)
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
      filtered_my_gods: function() {
        var self = this
        return self.my_gods.filter(function(my_god) {
          return my_god.name.indexOf(self.key) !== -1
        })
      },
      ordered_my_gods: function() {
        return _.orderBy(this.filtered_my_gods, 'followed_at', 'desc')
      },
      my_gods() {
        if (this.$store.state.cat_my_gods[this.cat]) {
          return this.$store.state.cat_my_gods[this.cat]
        } else {
          return []
        }
      }
    },
    data: function() {
      return {
        get_done: false,
        god_name: '',
        key: ''
      }
    },
    mounted() {
      let self = this
      this.$store.dispatch('getMyGods', this.cat).then(function() {
        self.get_done = true
      })
    },
    methods: {
      loadMore: function(index, done) {
        this.$store.dispatch('getMyGods', this.cat).then(function () {
          setTimeout(done, 3000)
        })
      },
      add: function(god_name) {
        this.god_name = god_name
      }
    }
  }
</script>

<style scoped>
  .floating-label {
    width: 30%;
  }
</style>
