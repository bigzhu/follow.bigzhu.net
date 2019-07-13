<template>
  <q-page padding>
    <GodItem v-for="god in orderedStars" :god="god" :key="god.id" class="god-item">
    </GodItem>
    <Top></Top>
  </q-page>
</template>

<script>
  import _ from 'lodash'
  import Top from '../components/Top'
  import GodItem from '../components/GodItem'
  import Following from './Following'
  export default {
    mixins: [Following],
    props: {
      message: {
        type: Object,
        default: function () {
          return {
            userName: '',
            id: 0
          }
        }
      }
    },
    components: {
      Top,
      GodItem
    },
    computed: {
      orderedStars: function () {
        return _.orderBy(this.filterCat, 'followingAt', 'desc').filter((o) => {
          return o.name !== this.starName
        })
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
// god 直接留出间距
  .q-card
    margin 0.5rem
  .floating-label
    width 30%
</style>
