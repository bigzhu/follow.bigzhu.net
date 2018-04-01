<template>
  <div class="layout-padding">
    <messages type="god"></messages>
    <Top></Top>
  </div>
</template>

<script>
  import GodInfo from '../components/GodInfo'
  import Messages from '../components/Messages'
  import Top from '../components/Top'
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
      godInfo() {
        let godInfo = this.$store.state.godInfos[this.godName]
        if (godInfo) {
          return godInfo
        }
      },
      godName() {
        return this.$route.params.godName
      }
    },
    mounted() {
      this.$store.dispatch('getGod', this.godName)
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
