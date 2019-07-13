<template>
  <div :class="{ 'invisible': !show}" class="row flex-center">
    <q-spinner v-show="oldLoading" :size="14" name="tail"></q-spinner>
    <a @click.Native='old' href='javascript:void(0)'>
      <q-icon name="history" v-show="!oldLoading"></q-icon>
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
      oldLoading() {
        return this.$store.state.message.oldLoading
      }
    },
    props: ['show', 'starName', 'searchKey'],
    mounted() {},
    methods: {
      old: function () {
        this.$store.dispatch('oldMessage', {
          starName: this.starName,
          searchKey: this.searchKey
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
