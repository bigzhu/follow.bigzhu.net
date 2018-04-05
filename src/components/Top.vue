<template>
  <QPageSticky v-back-to-top.animate="{offset: 500, duration: 200}" corner="bottom-right" :offset="[-286, 80]" class="bz">
    <q-btn round color="" icon="keyboard_arrow_up" />
  </QPageSticky>
</template>

<script>
  import {
    QBtn,
    QPageSticky,
    BackToTop
  } from 'quasar'
  export default {
    components: {
      QBtn,
      QPageSticky
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
</style>
