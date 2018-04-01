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
  import GodInfo from './GodInfo'
  import RightInfo from './RightInfo'
  export default {
    components: {
      UnRead,
      Top,
      Messages,
      GodInfo,
      RightInfo
    },
    data() {
      return {}
    },
    computed: {
      godInfo() {
        if (!this.godName) return
        let godInfo = this.$store.state.godInfos[this.godName]
        if (godInfo) {
          return godInfo
        }
      },
      godName() {
        if (this.$route.params.godName) return this.$route.params.godName
      }
    },
    mounted() {
      if (this.godName) {
        this.$store.dispatch('getGod', this.godName)
      }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function() {
        if (this.godName) {
          this.$store.dispatch('getGod', this.godName)
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
