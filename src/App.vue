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
      <div slot="header" class="toolbar dark inverted toolbar-item">
        <a class="menu-item" href="javascript:;">
          寻他
        </a>
        <a class="menu-item" href="javascript:;">
          传记
        </a>
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
  .toolbar-item {
    justify-content: flex-start;
  }

  .menu-item:hover {
    background: rgba(0,0,0,.03);
    color: rgba(0,0,0,.7);
  }
  .menu-item {
    padding: 1em 2em;
    color: rgba(0,0,0,.5);
  }

  html {
    font-size: 14px;
    font-family: Lato,arial,Microsoft YaHei,"sans-serif";
    line-height: 1.5;
    font-weight: 400;
    background-color: #fafafa;
    color: rgba(0,0,0,.76);
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
