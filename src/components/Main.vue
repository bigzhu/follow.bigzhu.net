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
  // import GodInfo from './GodInfo'
  // import RightInfo from './RightInfo'
  export default {
    components: {
      UnRead,
      Top,
      Messages
      // GodInfo,
      // RightInfo
    },
    data() {
      return {}
    },
    computed: {
      godInfo() {
        if (!this.starName) return
        let godInfo = this.$store.state.godInfos[this.starName]
        if (godInfo) {
          return godInfo
        }
        return null
      },
      starName() {
        if (this.$route.params.starName) return this.$route.params.starName
        return ''
      }
    },
    mounted() {
      if (this.starName) {
        this.$store.dispatch('getGod', this.starName)
      }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function () {
        if (this.starName) {
          this.$store.dispatch('getGod', this.starName)
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
