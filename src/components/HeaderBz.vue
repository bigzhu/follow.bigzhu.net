<template>
  <div class='header-bz'>
    <div class="toolbar dark inverted menu-bz header-one-bz">
      <button
        class="hide-on-drawer-visible"
        @click="$refs.drawer.open()"
        >
        <i>menu</i>
      </button>
      <q-toolbar-title>
        <img class="logo-img" src="../assets/logo.svg">
        Follow Center
      </q-toolbar-title>
      <q-search v-model="search_value" :debounce="600" placeholder="搜索" class="white toolbar-search"  ></q-search>

      <a class="menu-item login-bz" href="javascript:;">
        登录
      </a>
    </div>
    <div class="toolbar dark inverted menu-bz toolbar-item">
      <a class="menu-item" href="javascript:;">
        寻他
      </a>
      <a class="menu-item" href="javascript:;">
        传记
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {
    },
    computed: {
    },
    data: function () {
      return {
        search_value: ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
      })
    },
    methods: {
    }
  }
</script>

<style>
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
  .toolbar {
    padding: 0;
    padding-left: 3rem;
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

