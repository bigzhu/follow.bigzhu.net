<template>
  <div>
    <div class="blank-padding"></div>
    <RightInfo></RightInfo>
  </div>
</template>

<script>
  import RightInfo from './RightInfo'
  export default {
    props: [],
    components: {
      RightInfo
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

<style scoped>
  .blank-padding {
    padding: 18px;
  }
</style>
