<template>
  <div id="q-app">
    <q-layout view="hhh LpR lfr" v-if="starsDone && starSocialsDone">
      <q-header v-model="showHeader" class="bg-white">
        <BarOne/>
        <BarTwo/>
      </q-header>
      <!-- 左菜单 -->
      <q-drawer side="left" v-model="showLeft">
        <LeftMenu/>
      </q-drawer>
      <!-- 右菜单 -->
      <q-drawer side="right" v-model="showRight">
        <RightMenu/>
      </q-drawer>
      <q-page-container>
        <router-view/>
      </q-page-container>
    </q-layout>
    <!-- 自动的 loading -->
    <q-ajax-bar/>
  </div>
</template>

<script>
    import LeftMenu from './components/LeftMenu'
    import RightMenu from './components/RightMenu'

    import BarTwo from './components/BarTwo'
    import BarOne from './components/BarOne'
    import store from './store'

    export default {
        store,
        data: function () {
            return {
                starsDone: false,
                starSocialsDone: false
            }
        },
        name: 'App',
        beforeCreate() {
            this.$store.dispatch('getStarSocials').then(() => {
                this.starSocialsDone = true
            })
            this.$store.dispatch('getStars').then(() => {
                this.starsDone = true
            })
        },
        components: {
            RightMenu,
            LeftMenu,
            BarOne,
            BarTwo
        },
        computed: {
            showHeader: {
                get: function () {
                    return this.$store.state.main.showHeader
                },
                set: function (showHeader) {
                    this.$store.commit('showHeader', showHeader)
                }
            },
            showRight: {
                get: function () {
                    return this.$store.state.main.showRight
                },
                set: function (showRight) {
                    this.$store.commit('showRight', showRight)
                }
            },
            showLeft: {
                get: function () {
                    return this.$store.state.main.showLeft
                },
                set: function () {
                    this.$store.commit('showLeft', false)
                }
            }
        }
    }
</script>

<style lang="stylus">
  // 浮动右边划出, 不要有阴影
  .q-layout-drawer-delimiter
    box-shadow none
</style>
<style lang="stylus" scoped>
  // 左右滑出控件, 背景用白色
  .q-drawer-container >>> .q-layout-drawer
    background: white

  // 框架带的 padding 太宽, 改小一些
  .layout-padding
    padding: 1rem
    padding-top: 0

  // 平板不要 padding
  @media (max-width 991px)
    .layout-padding
      padding: 0

  //q-toolbar-inverted 的没法用 variables 来改 改为白色
  /*
  .q-toolbar-inverted {
    background-color: white;
  }
  */
</style>
