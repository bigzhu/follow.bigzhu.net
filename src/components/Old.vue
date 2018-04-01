<template>
  <div :class="{ 'invisible': !show}" class="old-bz">
    <q-spinner v-show="old_loading" :size="14" name="tail"></q-spinner>
    <a @click='old' href='javascript:void(0)'>
      <q-icon name="history" v-show="!old_loading"></q-icon>
      {{ $t("历史消息") }}
    </a>
  </div>
</template>

<script>
  import {QSpinner, QIcon} from 'quasar'
  export default {
    components: {
      QIcon,
      QSpinner
    },
    computed: {
      old_loading () {
        return this.$store.state.old_loading
      }
    },
    props: ['show', 'godName', 'search_key'],
    mounted () {
    },
    methods: {
      old: function () {
        this.$store.dispatch('oldMessage', {godName: this.godName, search_key: this.search_key, limit: 10})
      }
    }
  }
</script>

<style scoped>
  .q-spinner {
    height: 21px;
  }
  .old-bz {
    display:  flex;
    justify-content: center;
  }
</style>
