<template>
  <!-- 第一栏标题 -->
  <q-toolbar color="primary" inverted>
    <!--logo-->
    <router-link :to="{name: 'Main'}">
      <img class="logo-img" src="../statics/assets/logo.svg">
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
    <UserInfo v-show="is_login" />
    <!--点击呼出右侧菜单-->
    <q-btn flat @click="$store.commit('show_right', !show_right)">
      <q-icon name="menu" />
    </q-btn>
  </q-toolbar>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import UserInfo from './UserInfo'
  export default {
    props: [],
    components: {
      UserInfo
    },
    computed: mapState({
      show_right: state => state.main.show_right,
      is_login: state => state.lib.oauth_info.name
    }),
    data: function() {
      return {}
    },
    mounted: function() {
      if (this.is_login === '') {
        // 取用户信息
        this.$store.dispatch('lib/getOauthInfo').catch((error) => {
          this.$q.notify(error.response.data)
        })
        // 取用户不关注社交类型
        this.$store.dispatch('getNoTypes')
      }
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      login: function() {
        this.$router.push({
          name: 'Oauth'
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .logo-img {
    vertical-align: middle;
    width: 2.5rem;
  }
</style>
