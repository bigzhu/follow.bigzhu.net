<template>
  <div id="q-app">
    <q-layout>
      <q-layout-header>
        <q-toolbar color="primary" inverted>
          <!--logo-->
          <router-link :to="{name: 'Main'}">
            <img class="logo-img" src="./statics/assets/logo.svg">
          </router-link>
          <!--title-->
          <q-toolbar-title>
            <router-link :to="{name: 'Main'}">
              Follow Center
            </router-link>
            <span slot="subtitle">Follow your dream</span>
          </q-toolbar-title>
          <!--login-->
          <q-btn v-show="!is_login" @click="login" flat small icon="fa-sign-in">
            {{ $t("登录") }}
          </q-btn>
          <!--userInfo-->
          <UserInfo v-show="is_login"/>
          <!--点击呼出右侧菜单-->
          <q-btn flat @click="$refs.layout.toggleRight()">
            <q-icon name="menu" />
          </q-btn>
        </q-toolbar>
        <!-- 第二栏标题 -->
        <q-tabs color="black" inverted>
          <q-route-tab slot="title" :to="{'name': 'Main'}" replace :label="$t('首页')" />
          <q-route-tab slot="title" :to="{'name': 'Recommand'}" replace :label="$t('寻他')" />
          <q-route-tab slot="title" :to="{ name:'Following'}" replace :label="$t('关注中')" v-show="is_login" />
          <q-route-tab slot="title" :to="{ name:'Collect'}" replace :label="$t('收藏')" v-show="is_login" />
          <q-tab slot="title" @click="open('http://bigzhu.lorstone.com/tag/%E4%BC%A0%E8%AE%B0/')" :label="$t('传记')" />
        </q-tabs>
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
  import UserInfo from './components/UserInfo'
  import store from './store'
  export default {
    store,
    name: 'App',
    components: {
      UserInfo
    },
    mounted() {
      if (this.is_login === '') {
        // 取用户信息
        this.$store.dispatch('lib/getOauthInfo').catch((error) => {
          this.$q.notify(error.response.data)
        })
        this.$store.dispatch('getNoTypes')
      }
      this.$nextTick(function() {
        this.$store.state.layout = this.$refs.layout
      })
    },
    computed: {
      is_login() {
        return this.$store.state.lib.oauth_info.name
      },
      route_name() {
        return this.$route.name
      },
      oauth_info() {
        return this.$store.state.lib.oauth_info
      }
    },
    methods: {
      open(url) {
        var win = window.open(url, '_blank')
        win.focus()
      },
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
      },
      login: function() {
        this.$router.push({
          name: 'Oauth'
        })
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
  .logo-img {
    vertical-align: middle;
    width: 2.5rem;
  }
</style>
