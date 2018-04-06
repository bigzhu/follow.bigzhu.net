<template>
  <div class="box absolute-center">
    <div class="center-box">
      <img class="logo-img" src="../statics/assets/logo_word.png">
      <p class="discription">发现更广阔的世界</p>
      <Oauth/>
      <p class="sub">没有社交帐号?
        <router-link to="/">随意逛逛</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import Oauth from '../libs/components/Oauth'
  export default {
    components: {
      Oauth
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.$store.commit('show_right', false)
        vm.$store.commit('show_header', false)
      })
    },
    beforeRouteLeave(to, from, next) {
      if (!this.$q.platform.is.mobile) {
        this.$store.commit('show_right', true)
      }
      this.$store.commit('show_header', true)
      next()
    }
  }
</script>

<style lang="stylus" scoped>
  .sub
    margin-top 2rem
  .discription
    margin-bottom 8rem
    margin-top 2rem
  .center-box
    display flex
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  img
    width 15rem
  .box
    min-height calc(100vh - 306px)
    width 100%
    display flex
    justify-content center
    align-items center
</style>
