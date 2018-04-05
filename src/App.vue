<template>
  <div id="q-app">
    <q-layout>
      <q-layout-header>
        <BarOne/>
        <BarTwo/>
      </q-layout-header>
      <!-- 左菜单 -->
      <q-layout-drawer side="left">
      </q-layout-drawer>
      <!-- 右菜单 -->
      <q-layout-drawer side="right">
      </q-layout-drawer>
      <q-page-container>
        <router-view />
      </q-page-container>

    </q-layout>
    <q-ajax-bar />
  </div>
</template>

<script>
  import BarTwo from './components/BarTwo'
  import BarOne from './components/BarOne'
  import store from './store'
  export default {
    store,
    name: 'App',
    components: {
      BarOne,
      BarTwo
    },
    mounted() {
      this.$nextTick(function() {
        this.$store.state.layout = this.$refs.layout
      })
    },
    computed: {
    },
    methods: {
      scroll: function(data) {
        let self = this
        if (data.direction === 'up') {
          if (!this.will_hide_header) {
            this.will_hide_header = true
            this.timeout_id = setTimeout(function() {
              self.$refs.layout.headerOnScreen = false
              self.will_hide_header = false
            }, 1400)
          }
        }
        if (data.position === 0) {
          clearTimeout(this.timeout_id)
          this.$refs.layout.headerOnScreen = true
          self.will_hide_header = false
        }
      }
    }
  }
</script>

<style lang="stylus">
  .layout-aside.fixed.on-layout.layout-aside-right.scroll
    box-shadow none
</style>
<style lang="stylus" scoped>
  //q-toolbar-inverted 的没法用 variables 来改 改为白色
  .q-toolbar-inverted {
    background-color: white;
  }
</style>
