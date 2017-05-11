<template>
  <div class="layout-padding">
    <div class="row gutter">
      <div class="width-5of5 no-top-padding-bz">
        <img v-show="show_how_to_use_collect" class="width-5of5 responsive" src="../assets/how_to_use_collection.jpg">
        <messages></messages>
      </div>
      <div class="width-2of5 no-top-padding-bz bg">
        <div class="blank-padding"></div>
        <RightInfo></RightInfo>
      </div>
    </div>
    <Top></Top>
  </div>
</template>

<script>
  import '../assets/mobile.css'
  import Messages from './CollectMessages.vue'
  import RightInfo from './RightInfo'
  import UnRead from './UnRead'
  export default {
    components: {
      UnRead,
      RightInfo,
      Messages
    },
    data () {
      return {
      }
    },
    computed: {
      show_how_to_use_collect () {
        return this.$store.state.show_how_to_use_collect
      }
    },
    mounted () {
    },
    methods: {
    }
  }
</script>
