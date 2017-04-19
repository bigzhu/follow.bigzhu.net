<template>
  <div class="layout-padding">
    <div class="row gutter sm-column">
      <messages class="width-3of4 no-top-padding-bz"></messages>
      <div class="auto no-top-padding-bz bg">
          <div class="blank-padding"></div>
          <god-info v-show="god_name" :god_info="god_info"></god-info>
          <right-info></right-info>
      </div>
    </div>
    <Top></Top>
    <UnRead></UnRead>
  </div>
</template>

<script>
  import '../assets/mobile.css'
  import $ from 'jquery'
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
        if (this.$route.params.god_name) return this.$route.params.god_name.toLowerCase()
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
        console.log('getGodInfo')
        if (this.god_name) { this.$store.dispatch('getGod', this.god_name) }
      },
      top: function () {
        $('html, body').animate(
          {
            scrollTop: '0'
          }, 300
        )
      }
    },
    beforeRouteLeave (to, from, next) {
      this.$store.commit('SET_SHOW_BAR', true) // 离开时，确保Bar显示出来
      next()
    }
  }
</script>

<style>
  .blank-padding {
    padding: 18px;
  }
  .row.gutter> .no-top-padding-bz {
    padding-top: 0;
  }
</style>
