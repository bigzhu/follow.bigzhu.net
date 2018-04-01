<template>
  <div class="layout-padding">
    <img v-show="show_how_to_use_collect" class="width-5of5 responsive" src="../statics/assets/how_to_use_collection.jpg">
    <messages type="collect"></messages>
    <Top></Top>
  </div>
</template>

<script>
  import Top from '../components/Top'
  // import Messages from './CollectMessages.vue'
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
    data() {
      return {}
    },
    computed: {
      show_how_to_use_collect() {
        return this.$store.state.show_how_to_use_collect
      }
    },
    mounted() {},
    methods: {}
  }
</script>
