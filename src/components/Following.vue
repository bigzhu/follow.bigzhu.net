<template>
  <div class="layout-padding">
    <div class="row sm-column">
      <cat route_name="Following" :just_my="true" class="width-1of5 desktop-only">
      </cat>
      <div class="width-3of4">
        <GodItem v-for="god in ordered_my_gods" :god="god" :key="god.id" class="god-item">
        </GodItem>
        <SpinnerBz :show="loading"></SpinnerBz>
        <bottom-loader :el="$el" element_class=".god-item" v-on:bottom="bottomCall"></bottom-loader>
        <AddGodButton v-on:add="add"></AddGodButton>
      </div>
    </div>
  </div>
</template>

<script>
  import AddGodButton from './AddGodButton'
  import $ from 'jquery'
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
        key: ''
      }
    },
    mounted () {
      this.$store.dispatch('getMyGods', {cat: this.$route.params.cat})
      $('body').visibility()
    },
    methods: {
      add: function (god_name) {
        console.log(god_name)
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
