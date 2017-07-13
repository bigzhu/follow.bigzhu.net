<template>
  <q-scroll-area style="width: 100%; height: 100%">
    <div :class="{'blank-padding-20':isInList(name, ['Main', 'Collect', 'God']), 'blank-padding-11': isInList(name, ['Recommand', 'Following'])}" class="blank-padding desktop-only"></div>
    <RightInfo v-if="name==='Main' || name==='Collect'"></RightInfo>
    <Cat v-show="name==='Recommand'"></Cat>
    <Cat v-show="name==='Following'" route_name="Following" :just_my="true"></Cat>
    <GodInfo v-show="god_name" :god="god_info"></GodInfo>
  </q-scroll-area>
</template>

<script>
  import {
    QScrollArea
  } from 'quasar'
  import isInList from 'bz-lib/functions/isInList'
  import GodInfo from './GodInfo'
  import Cat from './Cat'
  import RightInfo from './RightInfo'
  export default {
    props: [],
    components: {
      QScrollArea,
      Cat,
      GodInfo,
      RightInfo
    },
    computed: {
      name() {
        return this.$route.name
      },
      god_info() {
        let god_info = this.$store.state.god_infos[this.god_name]
        if (god_info) {
          return god_info
        }
      },
      god_name() {
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

<style lang="stylus" scoped>
  .q-list + .q-list
    margin-top 0
  .blank-padding-20 {
    padding: 20px;
  }
  .blank-padding-11 {
    padding: 11px;
  }
</style>
