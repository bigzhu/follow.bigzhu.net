<template>
  <q-fixed-position v-back-to-top.animate="{offset: 500, duration: 200}" corner="bottom-right" :offset="[-286, 0]" class="bz">
    <q-btn round color="" icon="keyboard_arrow_up" />
  </q-fixed-position>
</template>

<script>
  import {
    QBtn,
    QFixedPosition,
    BackToTop
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QFixedPosition
    },
    directives: {
      BackToTop
    },
    vuex: {
      getters: {},
      actions: {}
    },
    props: [],

    computed: {},
    data: function() {
      return {}
    },
    mounted() {
      // $(this.$el).popup()
    },
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .fixed-bottom-right
    z-index 9999
    bottom 6rem
</style>
