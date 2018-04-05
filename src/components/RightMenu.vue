<template>
  <q-scroll-area style="width: 100%; height: 100%">
    <div :class="{'blank-padding-20':isInList(name, ['Main', 'Collect', 'God']), 'blank-padding-11': isInList(name, ['Recommand', 'Following'])}" class="blank-padding desktop-only"></div>
    <RightInfo v-if="name==='Main' || name==='Collect'"></RightInfo>
    <Cat v-if="name==='Recommand'"></Cat>
    <Cat v-if="name==='Following'" route_name="Following" :just_my="1"></Cat>
    <GodInfo v-show="god_name" :god="god_info"></GodInfo>
    <MessageConf/>
  </q-scroll-area>
</template>

<script>
  import isInList from '../libs/functions/isInList.js'
  import GodInfo from './GodInfo'
  import Cat from './Cat'
  import RightInfo from './RightInfo'
  import MessageConf from './MessageConf'
  export default {
    props: [],
    components: {
      MessageConf,
      Cat,
      GodInfo,
      RightInfo
    },
    computed: {
      name() {
        return this.$route.name
      },
      god_info() {
        let god_info = this.$store.state.god.god_infos[this.god_name]
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
/*
  .q-list + .q-list
    margin-top 0
  */
  .blank-padding-20
    padding-top 48px // 字体高度不可知, 我这里是 20px, 只有先写死 20px+2*1rem = 48px
  .blank-padding-11
    padding 11px
</style>
