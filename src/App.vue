<template>
  <div id="q-app">
    <q-layout>
      <q-drawer left-side swipe-only ref="header_drawer">
        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            Follow Center
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="" :to="{'name': 'Recommand'}" exact>
            {{ $t("App.whattofollow") }}
          </q-drawer-link>
          <hr>
          <q-drawer-link v-show="oauth_info.name" :to="{ name:'Following'}" icon="" exact>
            {{ $t("App.following") }}
          </q-drawer-link>
          <hr v-show="oauth_info.name">
          <q-drawer-link icon="" to="/Bio">
            传记
          </q-drawer-link>
        </div>
      </q-drawer>
      <q-drawer right-side swipe-only ref="user_info_drawer">
        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            <img :src="oauth_info.avatar" class="avatar"></img> {{oauth_info.name}}
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="" to="/UserSet" exact>
            设置
          </q-drawer-link>
          <hr>
          <div class="item item-link router-link-active">
            <div class="item-content">
              <a href="/api_logout">退出登录</a>
            </div>
          </div>
        </div>
      </q-drawer>
      <div class="layout-view">
        <div :class="{'header-sticky': sticky}" :style="'top: '+scroll_top+'px;'" class="header-bz" >
          <div class="toolbar dark inverted menu-bz header-one-bz">
            <button
              class="hide-on-drawer-visible"
              @click="$refs.header_drawer.open()"
              >
              <i>menu</i>
            </button>
            <q-toolbar-title>
              <router-link :to="{name: 'Main'}">
                <img class="logo-img" src="./statics/assets/logo.svg">
                <span class="desktop-only">
                  Follow Center
                </span>
              </router-link>
            </q-toolbar-title>
            <q-search v-model="search_value" :debounce="600" placeholder="搜索" class="white toolbar-search"></q-search>

            <a v-show="!oauth_info.name" class="menu-item login-bz" href="/login.html">
              登录
            </a>
            <a v-show="oauth_info.name" @click="$refs.user_info_drawer.open()" href="javascript:;" class="menu-item login-bz">
              <img :src="oauth_info.avatar" class="avatar small"></img>
            </a>
          </div>

          <div class="toolbar dark inverted desktop-only menu-bz toolbar-item">
            <router-link :to="{'name': 'Recommand'}" :class="{'active': this.$route.name==='Recommand'}" class="menu-item">{{ $t("App.whattofollow") }}</router-link>
            <router-link v-show="oauth_info.name" :to="{ name:'Following'}" :class="{'active': this.$route.name==='Following'}" class="menu-item">{{ $t("App.following") }}</router-link>
            <router-link v-show="oauth_info.name" :to="{ name:'Collect'}" :class="{'active': this.$route.name==='Collect'}" class="menu-item">{{ $t("App.collect") }}</router-link>
            <router-link :to="{ name:'Bio'}" :class="{'active': this.$route.name==='Bio'}" class="menu-item">{{ $t("App.biography") }}</router-link>
          </div>
        </div>
        <router-view></router-view>
      </div>
    </q-layout>
  </div>
</template>

<script>
  // import {Utils} from 'quasar'
  /*
  * Root component
  */
  import checkLogin from 'bz-lib/functions/checkLogin'
  import store from './store'
  export default {
    store,
    computed: {
      route_name () {
        return this.$route.name
      },
      oauth_info () {
        return store.state.p.oauth_info
      },
      show_bar () {
        return store.state.show_bar
      }
    },
    components: {
    },
    mounted () {
      if (checkLogin()) { this.$store.dispatch('getOauthInfo') }
      this.$nextTick(function () {
        this.nav_bar_height = document.getElementsByClassName('header-bz')[0].offsetHeight
        this.bindScroll()
      })
    },
    data () {
      return {
        search_value: '',
        last_scroll_top: 0, // 上次滚动的位置
        nav_bar_height: 0, // header 高度
        show_bar: true,
        sticky: false,
        scroll_top: 0
      }
    },
    methods: {
      bindScroll: function () {
        let self = this
        let scroll_target = document.getElementsByClassName('layout-view')[0]
        /*
        scroll_target.addEventListener('scroll', Utils.throttle(function () {
        if (self.route_name === 'Main') {
        window.pageXOffset = scroll_target.scrollLeft
        window.pageYOffset = scroll_target.scrollTop
        }
        self.check_bar(scroll_target)
        }, 100)
        )
        */
        scroll_target.addEventListener('scroll',
          function () {
            if (self.route_name === 'Main') {
              window.pageXOffset = scroll_target.scrollLeft
              window.pageYOffset = scroll_target.scrollTop
            }
            self.check_bar(scroll_target)
          }
        )
      },
      check_bar: function (scroll_target) {
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
          } else if (this.scroll_top + 10 >= st) { // 已经滚动到顶部, 改为 header-sticky
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

<style>
  html {
    font-size: 14px;
    font-family: Lato,arial,Microsoft YaHei,"sans-serif";
    line-height: 1.5;
    font-weight: 400;
    background-color: #fafafa;
    color: rgba(0,0,0,.76);
  }
  .q-search.white .q-search-input {
    background: white;
    box-shadow: none;
  }
  body.desktop .q-search.white .q-search-input:hover {
    background: none;
  }
  body.desktop .q-search.white .q-search-input:focus {
    color: rgba(0,0,0,.8);
  }
</style>

<style scoped>
  .header-bz.header-sticky {
    position: sticky;
  }
  .header-bz {
    position: relative;
    width: 100%;
    z-index: 10;
  }
  .toolbar {
    padding: 0;
  }
  .avatar.small {
    width: 2rem;
    height: 2rem;
  }
  @media screen and (min-width: 921px) {
    .toolbar {
      padding-left: 3rem;
    }
  }
  .menu-item.login-bz {
    padding: 22px 16px;
  }
  .header-one-bz {
    height: 65px;
  }
  .toolbar-item {
    border-top: .5px solid rgba(0,0,0,.05);
    justify-content: flex-start;
    box-shadow: 1px 1px 1px rgba(0,0,0,.09);
  }
  .menu-item.active {
    background: rgba(0,0,0,.03);
    color: rgba(0,0,0,.7);
  }
  .menu-item:hover {
    background: rgba(0,0,0,.03);
    color: rgba(0,0,0,.7);
  }
  .menu-item {
    padding: 1em 2em;
    color: rgba(0,0,0,.5);
  }

  .toolbar-title > div {
    padding: .93rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .logo-img {
    vertical-align: middle;
    width: 2.5rem;
  }

  @media screen and (min-width: 921px) {
    .toolbar-search {
      width: auto;
    }
  }
  @media screen and (max-width: 920px) {
    .toolbar-search {
      width: 12rem;
    }
  }
</style>
