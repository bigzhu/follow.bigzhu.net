<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout>
      <!--
      <HeaderBz v-show="show_bar" slot="header">
      </HeaderBz>
      -->
      <div v-show="show_bar" slot="header" class='header-bz'>
        <div class="toolbar dark inverted menu-bz header-one-bz">
          <button
            class="hide-on-drawer-visible"
            @click="$refs.header_drawer.open()"
            >
            <i>menu</i>
          </button>
          <q-toolbar-title>
            <router-link :to="{name: 'Main'}">
              <img class="logo-img" src="./assets/logo.svg">
              <span class="desktop-only">
                Follow Center
              </span>
            </router-link>
          </q-toolbar-title>
          <q-search v-model="search_value" :debounce="600" placeholder="搜索" class="white toolbar-search"  ></q-search>

          <a class="menu-item login-bz" href="javascript:;">
            登录
          </a>
        </div>

        <div class="toolbar dark inverted desktop-only menu-bz toolbar-item">
          <a class="menu-item" href="javascript:;">
            寻他
          </a>
          <a class="menu-item" href="javascript:;">
            传记
          </a>
        </div>
      </div>

      <q-drawer ref="header_drawer" class="mobile-only">
        <div class="toolbar light">
          <q-toolbar-title :padding="1">
            Drawer
          </q-toolbar-title>
        </div>

        <div class="list no-border platform-delimiter">
          <q-drawer-link icon="view_quilt" to="/showcase/layout" exact>
            About Layout
          </q-drawer-link>
          <hr>
          <div class="list-label">Layout Components</div>
          <q-drawer-link icon="build" to="/showcase/layout/toolbar">
            Toolbar
          </q-drawer-link>
          <q-drawer-link icon="tab" to="/showcase/layout/tabs">
            Tabs
          </q-drawer-link>
          <q-drawer-link icon="compare_arrows" to="/showcase/layout/drawer">
            Layout Drawer
          </q-drawer-link>
        </div>
      </q-drawer>
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
        search_value: ''
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
<style scoped>
  @media screen and (min-width: 921px) {
    .toolbar {
      padding-left: 3rem;
    }
  }
  .menu-item.login-bz {
    padding: 22px 16px;
  }
  .header-one-bz {
    height: 65px;
  }
  .toolbar-item {
    border-top: .5px solid rgba(0,0,0,.05);
    justify-content: flex-start;
    box-shadow: 1px 1px 1px rgba(0,0,0,.09);
  }

  .menu-item:hover {
    background: rgba(0,0,0,.03);
    color: rgba(0,0,0,.7);
  }
  .menu-item {
    padding: 1em 2em;
    color: rgba(0,0,0,.5);
  }

  .toolbar-title > div {
    padding: .93rem;
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
</style>

