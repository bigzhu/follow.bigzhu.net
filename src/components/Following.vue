<template>
  <div class="layout-padding">
    <NotYetFollow v-show="ordered_my_gods.length===0 && get_done"></NotYetFollow>
    <div class="row sm-column">
      <cat route_name="Following" :just_my="true" class="width-1of5 desktop-only">
      </cat>
      <div class="width-3of4">
        <!--
        <AddingGodItem v-show="god_name!==''" :god_name="god_name" @add_done="god_name=''">
        </AddingGodItem>
        -->
        <GodItem v-for="god in ordered_my_gods" :god="god" :key="god.id" class="god-item">
        </GodItem>
        <SpinnerBz :show="loading"></SpinnerBz>
        <BottomLoader :el="$el" element_class=".god-item" @:bottom="bottomCall"></BottomLoader>
        <AddGodButton v-on:add="add"></AddGodButton>
      </div>
    </div>
  </div>
</template>

<script>
  import NotYetFollow from './NotYetFollow'
  import BottomLoader from 'bz-bottom-loader'
  import SpinnerBz from './SpinnerBz'
  import AddingGodItem from './AddingGodItem'
  import AddGodButton from './AddGodButton'
  import _ from 'lodash'
  import GodItem from './GodItem'
  import AddGod from './AddGod'
  import Cat from './Cat'
  export default {
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god
        this.$store.commit('DELETE_MY_GOD', god_id)
      }
    },
    watch: {
      '$route.params': {
        handler: function () {
          if (this.my_gods.length === 0) {
            this.loading = true
          }
          this.$store.dispatch('getMyGods', {cat: this.$route.params.cat})
        },
        deep: true
      }
    },
    props: [],
    components: {
      NotYetFollow,
      BottomLoader,
      SpinnerBz,
      AddingGodItem,
      AddGodButton,
      AddGod,
      Cat,
      GodItem
    },
    computed: {
      filtered_my_gods: function () {
        var self = this
        return self.my_gods.filter(function (my_god) {
          return my_god.name.indexOf(self.key) !== -1
        })
      },
      ordered_my_gods: function () {
        return _.orderBy(this.filtered_my_gods, 'followed_at', 'desc')
      },
      my_gods () {
        if (this.$store.state.cat_my_gods[this.$route.params.cat]) {
          return this.$store.state.cat_my_gods[this.$route.params.cat]
        } else {
          return []
        }
      }
    },
    data: function () {
      return {
        get_done: false,
        god_name: '',
        loading: false,
        key: ''
      }
    },
    mounted () {
      let self = this
      this.$store.dispatch('getMyGods', {cat: this.$route.params.cat}).then(function () {
        self.get_done = true
      })
    },
    methods: {
      bottomCall: function () {
      },
      add: function (god_name) {
        this.god_name = god_name
      },
      disableLoading: function () {
        this.loading = false
      }
    }
  }
</script>

<style scoped>
  .floating-label {
    width: 30%;
  }
</style>
