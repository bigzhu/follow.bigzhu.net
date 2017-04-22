<template>
  <div :class="{ 'invisible_bz': !show}" class="old-bz">
    <spinner v-show="old_loading" :size="14" name="tail"></spinner>
    <a @click='old' href='javascript:void(0)'>
      <i v-show="!old_loading">history</i>
      {{ $t("Old.search") }}
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      old_loading () {
        return this.$store.state.old_loading
      }
    },
    props: ['show', 'god_name', 'search_key'],
    mounted () {
    },
    methods: {
      old: function () {
        this.$store.dispatch('oldMessage', {god_name: this.god_name, search_key: this.search_key, limit: 10})
      }
    }
  }
</script>

<style scoped>
  .invisible_bz { /*占位隐藏*/
    visibility:hidden;
  };
  .q-spinner {
    height: 21px;
  }
  .old-bz {
    display:  flex;
    justify-content: center;
    padding-bottom: 1rem;
  }
  a {
    color: #515151;
  }
</style>
