<template>
  <button
    v-back-to-top.animate="{offset: 500, duration: 200}"
    class="circular fixed-bottom-right animate-pop"
    >
    <i>keyboard_arrow_up</i>
  </button>
</template>

<script>
  export default {
    vuex: {
      getters: {
      },
      actions: {
      }
    },
    props: [],
    components: {
    },
    computed: {
    },
    data: function () {
      return {
      }
    },
    mounted () {
      // $(this.$el).popup()
    },
    methods: {
    }
  }
</script>

<style scoped>
  button.fixed-bottom-right:hover {
    background: #FFF;
    color: rgba(0,0,0,.8);
  }
  button.fixed-bottom-right {
    border: 1px solid #DADADA;
    right: 1rem;
    margin: 1rem;
    bottom: 5rem;
  }

  @media (min-width: 1100px) and (max-width: 1300px) {
    .top-bz {
      right: .5em;
    }
  } 
</style>

