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
      god_name() {
        if (this.$route.params.god_name) return this.$route.params.god_name
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
        if (this.god_name) {
          this.$store.dispatch('getGod', this.god_name)
        }
      }
    }
  }
</script>

<style scoped>
</style>
