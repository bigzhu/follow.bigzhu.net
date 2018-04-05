<template>
  <div id="q-app">
    <q-layout view="hhh LpR lfr">
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
/*
  .layout-aside.fixed.on-layout.layout-aside-right.scroll
    box-shadow none
    */
</style>
<style lang="stylus" scoped>
// 浮动右边划出, 不要有阴影
  .q-layout-drawer-delimiter
    box-shadow none
// 左右滑出控件, 背景继承自父, 不要有差异
  .q-drawer-container >>> .q-layout-drawer
    background: inherit
// 框架带的 padding 太宽, 改小一些
  .layout-padding
    padding: 1rem
    padding-top: 0

  //q-toolbar-inverted 的没法用 variables 来改 改为白色
  /*
  .q-toolbar-inverted {
    background-color: white;
  }
  */
</style>
