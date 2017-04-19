<template>
  <!--
  <button @click="top" :data-content="$t('Top.backtotop')" class="ui circular basic icon button large monitor only top-bz"><i class="angle up icon"></i></button>

  -->

  <button
    v-back-to-top
    class="circular fixed-bottom-right animate-pop"
    >
    <i>keyboard_arrow_up</i>
  </button>

</template>

<script>
  import $ from 'jquery'
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
      top: function () {
        $('html, body').animate(
          {
            scrollTop: '0'
          }, 300
        )
      }
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

