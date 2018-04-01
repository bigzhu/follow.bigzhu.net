<template>
  <div class="layout-padding">
    <messages></messages>
    <Top></Top>
    <UnRead></UnRead>
  </div>
</template>

<script>
  import Messages from '../components/Messages'
  import Top from '../components/Top'
  import UnRead from '../components/UnRead'
  import GodInfo from '../components/GodInfo'
  import RightInfo from '../components/RightInfo'
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
      god_info() {
        if (!this.godName) return
        let GodInfo = this.$store.state.god_infos[this.godName]
        if (GodInfo) {
          return GodInfo
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
