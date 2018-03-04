<template>
  <q-scroll-area style="width: 100%; height: 100%">
    <q-list-header>Left Panel</q-list-header>
    <q-side-link item to="/showcase/layout/play-with-layout">
      <q-item-side icon="account circle" />
      <q-item-main label="Play with Layout" sublabel="Learn more about it" />
      <q-item-side right icon="thumb_up" />
    </q-side-link>
    <q-side-link item to="/showcase/layout/drawer-panels">
      <q-item-side icon="view_array" />
      <q-item-main label="Drawer Panels" sublabel="Layout left/right sides" />
    </q-side-link>
    <q-side-link item to="/showcase/layout/fixed-positioning">
      <q-item-side icon="pin_drop" />
      <q-item-main label="Fixed Positioning" sublabel="...on a Layout" />
    </q-side-link>
    <q-side-link item to="/showcase/layout/floating-action-button">
      <q-item-side icon="play_for_work" />
      <q-item-main label="Floating Action Button" sublabel="For Page actions" />
    </q-side-link>

    <div v-if="true" style="padding: 25px 16px 16px;">
      <p class="caption" v-for="n in 50">
        <em>Left Panel has intended scroll</em>
      </p>
    </div>
  </q-scroll-area>
</template>

<script>
  import {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QSearch,
    QTabs,
    QRouteTab,
    QBtn,
    QIcon,
    QItemSide,
    QItemMain,
    QSideLink,
    QListHeader,
    QScrollArea
  } from 'quasar'
  export default {
    props: [],
    components: {
      QLayout,
      QToolbar,
      QToolbarTitle,
      QSearch,
      QTabs,
      QRouteTab,
      QBtn,
      QIcon,
      QItemSide,
      QItemMain,
      QSideLink,
      QListHeader,
      QScrollArea
    },
    computed: {},
    data: function() {
      return {}
    },
    mounted: function() {
      this.$nextTick(function() {
        // code that assumes this.$el is in-document
      })
    },
    methods: {}
  }
</script>

<style>

</style>
