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
          <q-btn v-show="!isLogin" @click="login" flat small icon="fa-sign-in">
            {{ $t("登录") }}
          </q-btn>
          <!--userInfo-->
          <q-btn v-show="isLogin" flat ref="target">
            <img :src="proxy(oauth_info.avatar)" class="avatar" />
            <q-popover ref="popover">
              <q-list item-separator link>
                <q-item @click="$router.push('/UserSet'), $refs.popover.close()">
                  {{ $t("设置") }}
                </q-item>
                <q-item @click="logout(), $refs.popover.close()">
                  {{ $t("退出") }}
                </q-item>
              </q-list>
            </q-popover>
          </q-btn>
          <!--点击呼出右侧菜单-->
          <q-btn flat @click="$refs.layout.toggleRight()">
            <q-icon name="menu" />
          </q-btn>
        </q-toolbar>

      </q-layout-header>
    </q-layout>
    <q-ajax-bar />
  </div>
</template>

<script>
  import store from './store'
  export default {
    name: 'App',
    store,
    mounted() {
      if (this.isLogin === '') {
        this.$store.dispatch('getOauthInfo')
        this.$store.dispatch('getNoTypes')
      }
      this.$nextTick(function() {
        this.$store.state.layout = this.$refs.layout
      })
    },
    computed: {
      isLogin() {
        return this.$store.state.lib.oauthInfo.name
      },
      routeName() {
        return this.$route.name
      },
      oauthInfo() {
        return this.$store.state.lib.oauthInfo
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
      logout: function() {
        window.location = '/api_logout'
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
