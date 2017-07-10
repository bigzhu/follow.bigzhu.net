<template>
  <div :class="{ 'hidden_bz': !show}" class="row justify-center" style="margin-bottom: 50px;">
    <q-spinner name="dots" slot="message" :size="30"></q-spinner>
  </div>
</template>

<script>
  import {
    QSpinner
  } from 'quasar'
  export default {
    props: ['show'],
    components: {
      QSpinner
    },
    computed: {},
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {}
  }
</script>

<style scoped>

</style>
