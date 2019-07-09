<template>
  <div class="center-container-bz">
    <img src="../statics/assets/no-message.svg">
    <p>{{ $t("跟踪") }}
      <router-link :to="{'name': 'Recommand'}">{{ $t("寻他") }}</router-link>{{ $t("里面寻找您感兴趣的人吧!") }}
    </p>
  </div>
</template>

<script>
  export default {
    props: [],
    components: {},
    computed: {},
    data: function () {
      return {}
    },
    mounted: function () {
      this.$nextTick(function () {})
    },
    methods: {}
  }
</script>

<style>

</style>
