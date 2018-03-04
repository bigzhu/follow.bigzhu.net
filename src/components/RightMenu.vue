<template>
  <q-scroll-area style="width: 100%; height: 100%">
    <div :class="{'blank-padding-20':isInList(name, ['Main', 'Collect', 'God']), 'blank-padding-11': isInList(name, ['Recommand', 'Following'])}" class="blank-padding desktop-only"></div>
    <RightInfo v-if="name==='Main' || name==='Collect'"></RightInfo>
    <Cat v-if="name==='Recommand'"></Cat>
    <Cat v-if="name==='Following'" route_name="Following" :just_my="1"></Cat>
    <GodInfo v-show="god_name" :god="godInfo"></GodInfo>
    <MessageConf/>
  </q-scroll-area>
</template>

<script>
  import {
    QCard,
    QScrollArea
  } from 'quasar'
  import isInList from 'bz-q-lib/functions/isInList.js'
  import GodInfo from './GodInfo'
  import Cat from './Cat'
  import RightInfo from './RightInfo'
  import MessageConf from './MessageConf'
  export default {
    props: [],
    components: {
      QCard,
      MessageConf,
      QScrollArea,
      Cat,
      GodInfo,
      RightInfo
    },
    computed: {
      name() {
        return this.$route.name
      },
      godInfo() {
        let godInfo = this.$store.state.godInfos[this.god_name]
        if (godInfo) {
          return godInfo
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
