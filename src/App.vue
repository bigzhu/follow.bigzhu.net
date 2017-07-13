<template>
  <div id="q-app">
    <q-layout ref="layout" :view="layoutStore.view" :left-breakpoint="layoutStore.leftBreakpoint" :right-breakpoint="layoutStore.rightBreakpoint" :reveal="layoutStore.reveal">
      <q-toolbar slot="header" color="primary" inverted>
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <router-link :to="{name: 'Main'}">
          <img class="logo-img" src="./statics/assets/logo.svg">
        </router-link>
        <q-toolbar-title>
          <router-link :to="{name: 'Main'}">
            Follow Center
          </router-link>
          <span slot="subtitle">Follow your dream</span>
        </q-toolbar-title>

        <q-btn v-show="!oauth_info.name" @click="login" flat small icon="fa-sign-in">
          登录
        </q-btn>
        <q-btn v-show="oauth_info.name" flat ref="target">
          <img :src="oauth_info.avatar" class="avatar" />
          <!-- Direct child of target -->
          <q-popover ref="popover">
            <q-list item-separator link>
              <q-item @click="$router.push('/UserSet'), $refs.popover.close()">
                设置
              </q-item>
              <q-item @click="logout(), $refs.popover.close()">
                退出
              </q-item>
            </q-list>
          </q-popover>
        </q-btn>


        <q-btn flat @click="$refs.layout.toggleRight()">
          <q-icon name="menu" />
        </q-btn>
      </q-toolbar>
      <q-toolbar slot="header" color="black" inverted>
        <!-- Navigation -->
        <q-tabs slot="navigation" color="black" inverted>
          <q-route-tab slot="title" :to="{'name': 'Main'}" replace :label="$t('App.main')" />
          <q-route-tab slot="title" :to="{'name': 'Recommand'}" replace :label="$t('App.whattofollow')" />
          <q-route-tab slot="title" :to="{ name:'Following'}" replace :label="$t('App.following')" v-show="oauth_info.name" />
          <q-route-tab slot="title" :to="{ name:'Collect'}" replace :label="$t('App.collect')" v-show="oauth_info.name" />
          <q-route-tab slot="title" :to="{ name:'Bio'}" replace :label="$t('App.biography')" />
        </q-tabs>
      </q-toolbar>
      <LeftMenu slot="left"></LeftMenu>
      <router-view />
      <RightMenu slot="right"></RightMenu>
    </q-layout>
  </div>
</template>

<script>
  // import {Utils} from 'quasar'
  /*
   * Root component
   */
  import {
    QList,
    QItem,
    QPopover,
    Toast,
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  } from 'quasar'
  import checkLogin from 'bz-lib/functions/checkLogin'
  import store from './store'
  import LeftMenu from './components/LeftMenu'
  import RightMenu from './components/RightMenu'
  export default {
    store,
    computed: {
      route_name() {
        return this.$route.name
      },
      oauth_info() {
        return store.state.p.oauth_info
      },
      show_bar() {
        return store.state.show_bar
      }
    },
    components: {
      QList,
      QItem,
      QPopover,
      Toast,
      RightMenu,
      LeftMenu,
      QLayout,
      QToolbar,
      QToolbarTitle,
      QSearch,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QItemSide,
      QItemMain,
      QSideLink,
      QListHeader,
      QScrollArea
    },
    mounted() {
      if (checkLogin()) {
        this.$store.dispatch('getOauthInfo')
      }
      this.$nextTick(function() {})
    },
    data() {
      return {
        layoutStore: {
          view: 'lhh LpR lfr',
          reveal: false,
          leftScroll: true,
          rightScroll: true,
          leftBreakpoint: 3996, // 定义多宽时, 自动展开 left
          rightBreakpoint: 1200,
          hideTabs: false
        },
        search_value: '',
        last_scroll_top: 0, // 上次滚动的位置
        nav_bar_height: 0, // header 高度
        sticky: false,
        scroll_top: 0
      }
    },
    methods: {
      logout: function () {
        window.location = '/api_logout'
      },
      login: function() {
        window.location = '/login.html'
      },
      check_bar: function(scroll_target) {
        var st = scroll_target.scrollTop
        if (Math.abs(this.last_scroll_top - st) <= 5) return
        if (st > this.last_scroll_top && st > this.nav_bar_height) { // 向下滚动
          if (this.sticky) { // sticky 是浮动
            this.sticky = false
            this.scroll_top = st
          }
          this.show_bar = false
        } else {
          if (!this.show_bar) { // 之前是隐藏时, 设定 top, 使其能滚动出来
            this.sticky = false
            this.scroll_top = st - this.nav_bar_height - 50
          } else if (this.scroll_top + 12 >= st) { // 已经滚动到顶部, 改为 header-sticky
            this.sticky = true
            this.scroll_top = 0
          }
          this.show_bar = true
        }
        this.last_scroll_top = st
      }
    }
  }
</script>

<style lang="stylus">
  .layout-aside.fixed.on-layout.layout-aside-right.scroll 
    box-shadow none
</style>

<style lang="stylus" scoped>
  .avatar
    width 2.4rem
    height 2.4rem
  //q-toolbar-inverted 的没法用 variables 来改 改为白色
  .q-toolbar-inverted {
    background-color: white;
  }
  .logo-img {
    vertical-align: middle;
    width: 2.5rem;
  }
</style>
