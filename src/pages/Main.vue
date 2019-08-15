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
      StarName() {
        if (this.$route.params.StarName) return this.$route.params.StarName
        return ''
      }
    },
    mounted() {
      this.getStarInfo()
    },
    watch: {
      '$route': 'getStarInfo'
    },
    methods: {
      getStarInfo: function () {
        if (this.StarName) {
          this.$store.dispatch('getGod', this.StarName)
        }
      }
    }
  }
</script>

<style scoped>

</style>
