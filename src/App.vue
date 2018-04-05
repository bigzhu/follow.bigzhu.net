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
    <!-- 自动的 loading -->
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
    computed: {},
    methods: {}
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
