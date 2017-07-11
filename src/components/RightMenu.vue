<template>
  <div>
    <div :class="{'blank-padding-20':isInList(name, ['Main', 'Collect']), 'blank-padding-11': isInList(name, ['Recommand', 'Following'])}"class="blank-padding desktop-only"></div>
    <RightInfo v-if="name==='Main' || name==='Collect'"></RightInfo>
    <Cat v-if="name==='Recommand'"></Cat>
    <Cat v-if="name==='Following'" route_name="Following" :just_my="true"></Cat>
    <GodInfo v-show="god_name" :god="god_info"></GodInfo>
  </div>
</template>

<script>
  import isInList from 'bz-lib/functions/isInList'
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
    methods: {
      isInList: isInList
    }
  }
</script>

<style scoped>
  .blank-padding-20 {
    padding: 20px;
  }
  .blank-padding-11 {
    padding: 11px;
  }
</style>
