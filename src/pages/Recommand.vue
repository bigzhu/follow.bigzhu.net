<template>
  <q-page padding>
    <div class="row">
      <StarItem v-for="star in orderedStars" :star="star" :key="star.id" class="star-item self-center">
      </StarItem>
    </div>
    <Top></Top>
  </q-page>
</template>

<script>
  import _ from 'lodash'
  import Top from '../components/Top'
  import StarItem from '../components/StarItem'
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
      StarItem
    },
    computed: {
      orderedStars: function () {
        return _.orderBy(this.filterCat, 'followingAt', 'desc').filter((o) => {
          return o.name !== this.StarName
        })
      }
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
// star 直接留出间距
  .q-card
    margin 0.5rem
  .floating-label
    width 30%
</style>
