<template>
  <div class="layout-padding">
    <q-infinite-scroll :offset="1000" :handler="loadMore">
      <GodItem v-for="god in not_myGods" :god="god" :key="god.id">
      </GodItem>
      <SpinnerBz :show="loading"></SpinnerBz>
    </q-infinite-scroll>
    <Top></Top>
  </div>
</template>

<script>
  import {
    QInfiniteScroll
  } from 'quasar'
  import Top from '../components/Top'
  import SpinnerBz from '../components/SpinnerBz'
  import GodItem from '../components/GodItem'

  export default {
    props: {
      message: {
        type: Object,
        default: function() {
          return {
            user_name: '',
            id: 0
          }
        }
      }
    },
    components: {
      Top,
      QInfiniteScroll,
      SpinnerBz,
      GodItem
    },
    directives: {},
    data: function() {
      return {
        no_more: false
      }
    },
    watch: {
      '$route.params': {
        handler: function() {
          let _this = this
          this.$store.dispatch('getPublicGods', this.$route.params.cat).then(function(data) {
            _this.disableGodLoading()
          })
          this.stat = 'button'
        },
        deep: true
      }
    },
    mounted() {
      // this.loadMore()
    },
    attached: function() {},
    computed: {
      loading: {
        set(loading) {
          this.$store.state.lib.loading = loading
        },
        get() {
          return this.$store.state.lib.loading
        }
      },
      not_myGods() {
        if (this.$store.state.god.cat_gods[this.$route.params.cat]) {
          return this.$store.state.god.cat_gods[this.$route.params.cat]
        } else {
          return []
        }
      },
      href: function() {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      god_info: function() {
        let god_info = this.$store.state.god_infos[this.message.user_name]
        if (god_info) {
          return god_info
        }
        return {
          godID: 0
        }
      }
    },
    methods: {
      loadMore: function(index, done) {
        let self = this
        this.$store.dispatch('getPublicGods', this.$route.params.cat).then(function(data) {
          self.disableGodLoading()
          setTimeout(done, 1000)
        })
      },
      disableGodLoading: function() {
        this.loading = false
        if (this.not_myGods.length === 0) {
          this.no_more = true
        } else {
          this.no_more = false
        }
      },
      toggleCollect: function(message) {
        if (message.collect) {
          this.$store.dispatch('uncollect', message.id).then(function(data) {
            this.uncollectDone(data.message)
          })
        } else {
          this.$store.dispatch('collect', message.id).then(function(data) {
            this.collectDone(data.message)
          })
        }
      },
      getGodInfo: function() {
        this.queryGod(this.message.user_name)
      },
      collectDone: function(message) {
        message.collect = 1
      },
      uncollectDone: function(message) {
        message.collect = null
      }
    }
  }
</script>

<style lang="stylus" scoped>
//  .clear-button-bz {
//    color: inherit!important;
//    background-color: inherit!important;
//    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
//  }
//
//  .ui.basic.negative.button.clear {
//    color: inherit!important;
//    background-color: inherit!important;
//    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
//  }
//
//  .ui.basic.positive.button.clear {
//    color: inherit!important;
//    background-color: inherit!important;
//    box-shadow: 0 0 0 1px rgba(34, 36, 38, 0.15) inset !important;
//  }
//
//  .ui.grid>.row>.column.top-margin {
//    margin-top: 1em;
//  }
//
//  .ui.segment.add-newgod-bz {
//    padding: 0;
//  }
//
//  .ui.segment.add-newgod:first-child {
//    margin-top: 1em;
//  }
//
//  .newgod-style {
//    width: 100%;
//    color: #515151;
//  }
//
//  .ui.inverted.dimmer.transparent-bz {
//    background-color: inherit;
//  }
//
//  .ui.add-newgod-style {
//    width: 100%;
//    color: #515151;
//  }
//
//  .ui.add-newgod-style:hover {
//    width: 100%;
//    color: #515151;
//    color: #494949;
//  }
//
//  .ui.add-newgod-style:focus {
//    width: 100%;
//    color: #515151;
//  }
</style>
