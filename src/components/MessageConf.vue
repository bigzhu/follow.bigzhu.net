<template>
  <div>
    <q-option-group @change="change" type="toggle" color="secondary" v-model="show_types" :options="[
            { label: 'github', value: 'github'},
            { label: 'tumblr', value: 'tumblr'},
            { label: 'twitter', value: 'twitter'},
            { label: 'instagram', value: 'instagram'}
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
      no_types() {
        return this.$store.state.no_types
      },
      show_types: {
        get() {
          return _.difference(this.types, this.no_types)
        },
        set(show_types) {
          this.$store.state.show_types = show_types
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
        let no_types = _.difference(this.types, this.show_types)
        this.$store.dispatch('setNoTypes', no_types)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  div
    margin: 1rem
</style>
