<template>
  <q-page padding>
    <messages></messages>
    <Top></Top>
    <UnRead></UnRead>
  </q-page>
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
      godName() {
        if (this.$route.params.godName) return this.$route.params.godName
      }
    },
    mounted() {
      this.getGodInfo()
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
    }
  }
</script>

<style scoped>
</style>
