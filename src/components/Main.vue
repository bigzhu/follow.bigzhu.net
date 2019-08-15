<template>
  <div class="layout-padding">
    <messages></messages>
    <Top></Top>
    <UnRead></UnRead>
  </div>
</template>

<script>
  import Messages from './Messages'
  import Top from './Top'
  import UnRead from './UnRead'
  // import StarInfo from './StarInfo'
  // import RightInfo from './RightInfo'
  export default {
    components: {
      UnRead,
      Top,
      Messages
      // StarInfo,
      // RightInfo
    },
    data() {
      return {}
    },
    computed: {
      godInfo() {
        if (!this.StarName) return
        let godInfo = this.$store.state.godInfos[this.StarName]
        if (godInfo) {
          return godInfo
        }
        return null
      },
      StarName() {
        if (this.$route.params.StarName) return this.$route.params.StarName
        return ''
      }
    },
    mounted() {
      if (this.StarName) {
        this.$store.dispatch('getGod', this.StarName)
      }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getStarInfo'
    },
    methods: {
      getStarInfo: function () {
        if (this.StarName) {
          this.$store.dispatch('getGod', this.StarName)
        }
      }
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('SET_SHOW_BAR', true) // 离开时，确保Bar显示出来
      next()
    }
  }
</script>

<style scoped>

</style>
