<template>
  <q-page padding>
    <img v-show="showHowToUseCollect" class="width-5of5 responsive" src="../statics/assets/how_to_use_collection.jpg">
    <messages type="collect"></messages>
    <Top></Top>
  </q-page>
</template>

<script>
  import Top from '../components/Top'
  import Messages from '../components/Messages'
  export default {
    components: {
      Top,
      Messages
    },
    computed: {
      showHowToUseCollect() {
        return this.$store.state.message.showHowToUseCollect
      }
    }
  }
</script>
