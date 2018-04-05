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
      SpinnerBz,
      GodItem
    },
    directives: {},
    data: function() {
      return {
        no_more: false // 避免没有更多god时候, 反复去 loadMore
      }
    },
    watch: {
      '$route.params': {
        handler: function() {
          // 参数变化时候, 重置 no_more
          this.no_more = false
          this.loadMore()
        },
        deep: true
      }
    },
    computed: {
      loading: {
        set(loading) {
          this.$store.commit('lib/loading', loading)
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
          god_id: 0
        }
      }
    },
    methods: {
      loadMore: function(index, done) {
        if (this.no_more) {
          setTimeout(done, 1000)
          return
        }
        this.loading = true
        this.$store.dispatch('getPublicGods', this.$route.params.cat).then((data) => {
          if (data.length === 0) {
            this.no_more = true
          }
          this.loading = false
          setTimeout(done, 1000)
        })
      },
      /*
      disableGodLoading: function() {
        this.loading = false
        if (this.not_myGods.length === 0) {
          this.no_more = true
        } else {
          this.no_more = false
        }
      },
      */
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
// god 直接留出间距
  .q-card
    margin 0.5rem
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
