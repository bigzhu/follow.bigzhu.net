<template>
  <q-fixed-position v-back-to-top.animate="{offset: 500, duration: 200}" corner="bottom-right" :offset="[-286, 0]">
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

<style scoped>
  /* 不要阴影 */
  .fixed-bottom-right .q-btn-round {
    box-shadow: none;
  }

  .fixed-bottom-right button:hover {
    background: #FFF;
    color: #26A69A;
    border: 1px solid #26A69A;
  }

  .fixed-bottom-right button {
    color: #DADADA;
    border: 1px solid #DADADA;
  }

  .fixed-bottom-right {
    right: 1rem;
    margin: 1rem;
    bottom: 6rem;
  }

  @media (min-width: 1100px) and (max-width: 1300px) {
    .top-bz {
      right: .5em;
    }
  }
</style>
