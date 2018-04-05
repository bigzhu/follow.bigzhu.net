<template>
  <div :class="{ 'invisible': !show}" class="row flex-center">
    <q-spinner v-show="old_loading" :size="14" name="tail"></q-spinner>
    <a @click='old' href='javascript:void(0)'>
      <q-icon name="history" v-show="!old_loading"></q-icon>
      {{ $t("历史消息") }}
    </a>
  </div>
</template>

<script>
  import {
    QSpinner,
    QIcon
  } from 'quasar'
  export default {
    components: {
      QIcon,
      QSpinner
    },
    computed: {
      old_loading() {
        return this.$store.state.message.old_loading
      }
    },
    props: ['show', 'god_name', 'search_key'],
    mounted() {},
    methods: {
      old: function() {
        this.$store.dispatch('oldMessage', {
          god_name: this.god_name,
          search_key: this.search_key,
          limit: 10
        })
      }
    }
  }
</script>

<style lang="stylus" scoped>
// 按钮周围撑开
  div
    margin: 1rem
/*
  .q-spinner {
    height: 21px;
  }
  */
</style>
