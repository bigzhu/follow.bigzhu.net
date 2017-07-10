<template>
  <div>
    <div class="blank-padding"></div>
    <RightInfo v-if="name==='Main' || name==='Collect'"></RightInfo>
    <Cat v-if="name==='Recommand'"></Cat>
    <Cat v-if="name==='Following'" route_name="Following" :just_my="true"></Cat>
    <GodInfo v-show="god_name" :god="god_info"></GodInfo>
  </div>
</template>

<script>
  import GodInfo from './GodInfo'
  import Cat from './Cat'
  import RightInfo from './RightInfo'
  export default {
    props: [],
    components: {
      Cat,
      GodInfo,
      RightInfo
    },
    computed: {
      name() {
        return this.$route.name
      },
      god_info () {
        let god_info = this.$store.state.god_infos[this.god_name]
        if (god_info) {
          return god_info
        }
      },
      god_name () {
        return this.$route.params.god_name
      }
    },
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {}
  }
</script>

<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
