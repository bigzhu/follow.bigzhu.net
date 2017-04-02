<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <div slot="header" class="toolbar dark inverted">

        <!-- opens drawer using its ref -->
        <button
          class="hide-on-drawer-visible"
          @click="$refs.drawer.open()"
          >
          <i>menu</i>
        </button>
        <q-toolbar-title :padding="2">
          <img class="logo-img" src="./assets/logo.svg">
          Follow Center
        </q-toolbar-title>
        <q-search placeholder="搜索" class="white toolbar-search" v-model="searchModel" ></q-search>
      </div>
      <div slot="header" class="toolbar dark inverted">
        <button>
          寻他
        </button>
        <button>
          传记
        </button>
      </div>
      <router-view class="layout-view"></router-view>
    </q-layout>
  </div>
</template>

<script>
  /*
  * Root component
  */
  export default {}
</script>

<style>
  html {
    font-size: 14px;
  }
  .toolbar-title > div {
    padding-top: .9rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
  .logo-img {
    vertical-align: middle;
    width: 2.5rem;
  }
  .toolbar-search {
    width: auto;
  }
  .q-search.white .q-search-input {
    background: white;
    box-shadow: none;
  }
  body.desktop .q-search.white .q-search-input:hover {
    background: none;
  }
  body.desktop .q-search.white .q-search-input:focus {
    color: rgba(0,0,0,.8);
  }

</style>
