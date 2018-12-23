<template>
  <q-page padding >
    <messages type="god"></messages>
    <Top></Top>
  </q-page>
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
    computed: {
      god_info() {
        let god_info = this.$store.state.god_infos[this.star_name]
        if (god_info) {
          return god_info
        }
      },
      star_name() {
        return this.$route.params.star_name
      }
    },
    mounted() {
      this.$store.dispatch('getGod', this.star_name)
    }
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
