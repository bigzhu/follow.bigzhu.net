<template>
  <div class="box">
    <div class="center-box">
      <img class="logo-img" src="../statics/assets/logo_word.png">
<p class="discription">发现更广阔的世界</p>
      <Oauth/>
        <p class="sub">没有社交帐号? <router-link to="/">随意逛逛</router-link></p>
    </div>
  </div>
</template>

<script>
  import Oauth from '../libs/components/Oauth'
  export default {
    props: [],
    components: {
      Oauth
    },
    computed: {},
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {},
    beforeRouteEnter(to, from, next) {
      next(vm => {
        // 通过 `vm` 访问组件实例
        console.log('hideRight')
        vm.$store.state.layout.hideRight()
      })
    },
    beforeRouteLeave(to, from, next) {
      this.$store.state.layout.showRight()
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
