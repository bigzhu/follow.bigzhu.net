<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <HeaderBz v-show="show_bar" slot="header">
      </HeaderBz>
      <div class="layout-view">
        <router-view></router-view>
      </div>
    </q-layout>
  </div>
</template>

<script>
  /*
  * Root component
  */
  import store from './store'
  import HeaderBz from './components/HeaderBz'
  export default {
    store,
    computed: {
      show_bar () {
        return store.state.show_bar
      }
    },
    components: {
      HeaderBz
    },
    data () {
      return {
      }
    }
  }
</script>

<style>
  html {
    font-size: 14px;
    font-family: Lato,arial,Microsoft YaHei,"sans-serif";
    line-height: 1.5;
    font-weight: 400;
    background-color: #fafafa;
    color: rgba(0,0,0,.76);
  }
</style>
