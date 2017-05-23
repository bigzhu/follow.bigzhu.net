<template>
  <div class="layout-padding">
    <div class="row gutter sm-column">
      <messages class="width-5of5 no-top-padding-bz"></messages>
      <div class="width-2of5 no-top-padding-bz bg">
          <div class="blank-padding"></div>
          <RightInfo></RightInfo>
      </div>
    </div>
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
    data () {
      return {
      }
    },
    computed: {
      god_info () {
        if (!this.god_name) return
        let god_info = this.$store.state.god_infos[this.god_name]
        if (god_info) {
          return god_info
        }
      },
      god_name () {
        if (this.$route.params.god_name) return this.$route.params.god_name
      }
    },
    mounted () {
      if (this.god_name) { this.$store.dispatch('getGod', this.god_name) }
      // $('body').visibility()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function () {
        if (this.god_name) { this.$store.dispatch('getGod', this.god_name) }
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('SET_SHOW_BAR', true) // 离开时，确保Bar显示出来
      next()
    }
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }
  .row.gutter> .no-top-padding-bz {
    padding-top: 0;
  }
</style>
