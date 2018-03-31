<template>
  <div class="center-container-bz">
    <img src="../statics/assets/no-message.svg">
    <p>{{ $t("Messages.nofollow") }} <router-link :to="{'name': 'Recommand'}">{{ $t("Messages.whattofollow") }}</router-link>{{ $t("Messages.interesting") }}</p>
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
</style>
