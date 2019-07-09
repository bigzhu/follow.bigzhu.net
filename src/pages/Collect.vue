<template>
  <q-page padding>
    <img v-show="show_how_to_use_collect" class="width-5of5 responsive" src="../statics/assets/how_to_use_collection.jpg">
    <messages type="collect"></messages>
    <Top></Top>
  </q-page>
</template>

<script>
  import Top from '../components/Top'
  import Messages from '../components/Messages'
  import RightInfo from '../components/RightInfo'
  import UnRead from '../components/UnRead'
  export default {
    components: {
      Top,
      UnRead,
      RightInfo,
      Messages
    },
    computed: {
      show_how_to_use_collect() {
        return this.$store.state.message.show_how_to_use_collect
      }
    }
  }
</script>
