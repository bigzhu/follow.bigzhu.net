<template>
  <q-scroll-area style="width: 100%; height: 100%">
    <div :class="{'blank-padding-20':isInList(name, ['Main', 'Collect', 'Star']), 'blank-padding-11': isInList(name, ['Recommand', 'Following'])}" class="blank-padding desktop-only"></div>
    <Cat v-if="name==='Recommand'" routeName="Recommand"></Cat>
    <Cat v-if="name==='Following'" routeName="Following" :justMy="1"></Cat>
    <StarInfo class='star-info' v-if="name!='Recommand'" />
    <!--
    <MessageConf v-if="!isInList(name, ['Recommand', 'Following'])" />
      <br>
    -->
    <br>
    <RightInfo />
  </q-scroll-area>
</template>

<script>
  import isInList from 'bz-q-lib/src/functions/isInList.js'
  import StarInfo from './StarInfo'
  import Cat from './Cat'
  import RightInfo from './RightInfo'
  // import MessageConf from './MessageConf'
  export default {
    props: [],
    components: {
      // MessageConf,
      Cat,
      StarInfo,
      RightInfo
    },
    computed: {
      name() {
        return this.$route.name
      },
      starInfo() {
        let idStr = this.$store.state.star.StarNameIDS[this.StarName]
        let star = this.$store.state.star.mapStars[idStr]
        return star
      },
      StarName() {
        // return this.$route.params.StarName
        return this.$store.state.star.nowStar.name
      }
    },
    data: function () {
      return {}
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      isInList: isInList
    }
  }
</script>

<style lang="stylus" scoped>
// star info card 的下缘阴影线不要显示出来
.star-info
  box-shadow none
/*
  .blank-padding-20
    padding-top 48px // 字体高度不可知, 我这里是 20px, 只有先写死 20px+2*1rem = 48px
  .blank-padding-11
    padding 11px
    */
</style>
