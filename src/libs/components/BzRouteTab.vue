<template>
  <router-link tag="div" :to="to" :replace="replace" :append="append" :exact="exact" :event="routerLinkEventName" class="q-tab column flex-center relative-position" :class="classes" v-ripple.mat @click.native="select">
    <q-icon :name="icon" v-if="icon" class="q-tab-icon"></q-icon>
    <span v-if="label" class="q-tab-label" v-html="label"></span>
    <span v-if="count" class="floating label circular">{{count}}</span>
    <div v-else-if="alert" class="q-dot"></div>

    <slot></slot>

    <div v-if="$q.theme !== 'ios'" class="q-tabs-bar" :style="barStyle"></div>
  </router-link>
</template>

<script>
  import {
    QRouteTab
  } from 'quasar'
  export default {
    mixins: [QRouteTab],
    props: {
      names: {
        type: Array
      }
    },
    components: {},
    computed: {
      active() {
        if (this.names.indexOf(this.$route.name) !== -1) return true
      }
    },
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

<style lang="stylus" scoped>
</style>
