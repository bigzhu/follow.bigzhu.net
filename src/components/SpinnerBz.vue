<template>
  <div :class="{ 'hidden_bz': !show}" class="row justify-center" style="margin-bottom: 50px;">
    <QSpinnerDots slot="message" :size="30"></QSpinnerDots>
  </div>
</template>

<script>
  import {
    QSpinnerDots
  } from 'quasar'
  export default {
    props: ['show'],
    components: {
      QSpinnerDots
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
