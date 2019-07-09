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
  export default {
    components: {
      UnRead,
      Top,
      Messages
    },
    data() {
      return {}
    },
    computed: {
      starName() {
        if (this.$route.params.starName) return this.$route.params.starName
        return ''
      }
    },
    mounted() {
      this.getGodInfo()
    },
    watch: {
      '$route': 'getGodInfo'
    },
    methods: {
      getGodInfo: function () {
        if (this.starName) {
          this.$store.dispatch('getGod', this.starName)
        }
      }
    }
  }
</script>

<style scoped>

</style>
