<template>
  <div class="layout-padding">
    <messages type="god"></messages>
    <Top></Top>
  </div>
</template>

<script>
  import GodInfo from './GodInfo'
  import Messages from './Messages'
  import Top from './Top'
  export default {
    components: {
      Top,
      Messages,
      GodInfo
    },
    watch: {},
    data() {
      return {}
    },
    computed: {
      god_info() {
        let god_info = this.$store.state.god_infos[this.god_name]
        if (god_info) {
          return god_info
        }
      },
      god_name() {
        return this.$route.params.god_name
      }
    },
    mounted() {
      this.$store.dispatch('getGod', this.god_name)
      this.$nextTick(function() {})
    },
    methods: {}
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }

  .row.gutter>.no-top-padding-bz {
    padding-top: 0;
  }
</style>
