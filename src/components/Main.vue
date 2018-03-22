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
        if (!this.god_name) return
        let godInfo = this.$store.state.godInfos[this.god_name]
        if (godInfo) {
          return godInfo
        }
      },
      god_name() {
        if (this.$route.params.god_name) return this.$route.params.god_name
      }
    },
    mounted() {
      if (this.god_name) {
        this.$store.dispatch('getGod', this.god_name)
      }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function() {
        if (this.god_name) {
          this.$store.dispatch('getGod', this.god_name)
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
