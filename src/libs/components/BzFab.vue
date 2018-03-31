<template>
  <div class="q-fab row inline justify-center" :class="{'q-fab-opened': opened}">
    <q-btn @click="toggle" round :outline="outline" :push="push" :flat="flat" :color="color" :class="{glossy: glossy}">
      {{content}}
      <q-icon :name="icon" class="q-fab-icon absolute-full row flex-center full-width full-height"></q-icon>
      <q-icon :name="activeIcon" class="q-fab-active-icon absolute-full row flex-center full-width full-height"></q-icon>
    </q-btn>
    <div class="q-fab-actions flex no-wrap inline items-center" :class="`q-fab-${direction}`">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import {
    QFab
  } from 'quasar'
  export default {
    mixins: [QFab],
    props: {
      content: {
        // type: Number,
        default: ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>
