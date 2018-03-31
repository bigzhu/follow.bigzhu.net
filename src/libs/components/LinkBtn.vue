<template>
  <a :href="href">
  <button v-ripple.mat="!isDisabled" @click="click" class="q-btn row inline flex-center q-focusable q-hoverable relative-position" :class="classes">
    <div class="q-focus-helper"></div>
    <div
      v-if="loading && hasPercentage"
      class="q-btn-progress absolute-full"
      :class="{'q-btn-dark-progress': darkPercentage}"
      :style="{width: width}"
    ></div>

    <span class="q-btn-inner row col flex-center">
      <slot v-if="loading" name="loading">
        <q-spinner></q-spinner>
      </slot>

      <template v-else>
        <q-icon v-if="icon" :name="icon" :class="{'on-left': !round}"></q-icon>
        <slot></slot>
        <q-icon v-if="!round && iconRight" :name="iconRight" class="on-right"></q-icon>
      </template>
    </span>
  </button>
  </a>
</template>

<script>
  import {
    QBtn
  } from 'quasar'
  export default {
    mixins: [QBtn],
    props: ['href'],
    components: {},
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

<style lang="stylus" scoped>
a 
  color inherit
  text-decoration none
  .q-btn
    margin .5rem
</style>
