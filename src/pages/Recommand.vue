<template>
  <q-page padding>
    <GodItem v-for="god in ordered_influencers" :god="god" :key="god.id" class="god-item">
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
        default: function() {
          return {
            user_name: '',
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
      ordered_influencers: function() {
        return _.orderBy(this.filter_cat, 'followed_at', 'desc').filter((o) => {
          return o.name !== this.god_name
        })
      }
    },
    methods: {
    }
  }
</script>

<style lang="stylus" scoped>
// god 直接留出间距
  .q-card
    margin 0.5rem
  .floating-label
    width 30%
</style>
