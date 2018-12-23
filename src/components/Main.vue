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
      god_info() {
        if (!this.star_name) return
        let god_info = this.$store.state.god_infos[this.star_name]
        if (god_info) {
          return god_info
        }
      },
      star_name() {
        if (this.$route.params.star_name) return this.$route.params.star_name
      }
    },
    mounted() {
      if (this.star_name) {
        this.$store.dispatch('getGod', this.star_name)
      }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function() {
        if (this.star_name) {
          this.$store.dispatch('getGod', this.star_name)
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
