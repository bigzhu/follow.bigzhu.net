<template>
  <div>
    <q-option-group @change="change" type="toggle" color="secondary" v-model="showTypes" :options="[
            { label: 'github', value: 'github', checkedIcon: 'fa-github'},
            { label: 'tumblr', value: 'tumblr', checkedIcon: 'fa-tumblr'},
            { label: 'twitter', value: 'twitter', checkedIcon: 'fa-twitter'},
            { label: 'instagram', value: 'instagram', checkedIcon: 'fa-instagram'}
          ]" />
  </div>
</template>

<script>
  import _ from 'lodash'
  import {
    QOptionGroup
  } from 'quasar'
  export default {
    props: [],
    components: {
      QOptionGroup
    },
    computed: {
      noTypes() {
        return this.$store.state.noTypes
      },
      showTypes: {
        get() {
          return _.difference(this.types, this.noTypes)
        },
        set(showTypes) {
          this.$store.state.showTypes = showTypes
        }
      }
    },
    data: function() {
      return {
        types: ['twitter', 'instagram', 'tumblr', 'github']
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      change() {
        let noTypes = _.difference(this.types, this.showTypes)
        this.$store.dispatch('setNoTypes', noTypes)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  div
    margin: 1rem
</style>
