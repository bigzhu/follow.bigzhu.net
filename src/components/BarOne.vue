<template>
  <!-- 第一栏标题 -->
  <q-toolbar class="text-black">
    <!--logo-->
    <router-link :to="{name: 'Main'}">
      <img class="logo-img" src="../statics/assets/logo.svg"/>
    </router-link>
    <!--title-->
    <q-toolbar-title>
      <router-link :to="{name: 'Main'}">Follow Center</router-link>
      <span slot="subtitle">Follow your dream</span>
    </q-toolbar-title>
    <!--login-->
    <q-btn v-show="!isLogin" @click="login" flat small icon="ion-log-in">{{ $t('登录') }}</q-btn>
    <!--userInfo-->
    <UserInfo v-show="isLogin"/>
    <!--点击呼出右侧菜单-->
    <q-btn flat @click="$store.commit('showRight', !showRight)">
      <q-icon name="menu"/>
    </q-btn>
  </q-toolbar>
</template>

<script>
    import UserInfo from './UserInfo'

    export default {
        props: [],
        components: {
            UserInfo
        },
        computed: {
            showRight: {
                get: function () {
                    return this.$store.state.main.showRight
                },
                set: function (showRight) {
                    this.$store.commit('showRight', showRight)
                }
            },
            isLogin: function () {
                return this.$store.state.lib.oauthInfo.name
            }
        },
        mounted: function () {
            if (this.isLogin === '') {
                // 取用户信息
                this.$store.dispatch('lib/getOauthInfo')
                // 取用户不关注社交类型
                // this.$store.dispatch('getNoTypes')
            }
            this.$nextTick(function () {
                // code that assumes this.$el is in-document
            })
        },
        methods: {
            login: function () {
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
