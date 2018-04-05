<template>
  <div id="q-app">
    <q-layout>
      <q-layout-header>
        <BarOne/>
        <BarTwo/>
      </q-layout-header>
      <!-- 左菜单 -->
      <q-layout-drawer side="left" v-model="show_left">
        <LeftMenu/>
      </q-layout-drawer>
      <!-- 右菜单 -->
      <q-layout-drawer side="right" v-model="show_right">
        <RightMenu/>
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
  import {
    mapState
  } from 'vuex'
  import LeftMenu from './components/LeftMenu'
  import RightMenu from './components/RightMenu'

  import BarTwo from './components/BarTwo'
  import BarOne from './components/BarOne'
  import store from './store'
  export default {
    store,
    name: 'App',
    components: {
      RightMenu,
      LeftMenu,
      BarOne,
      BarTwo
    },
    computed: mapState({
      show_left: state => state.main.show_left,
      show_right: state => state.main.show_right
    }),
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
