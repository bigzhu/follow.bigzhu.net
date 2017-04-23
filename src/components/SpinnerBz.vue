<template>
  <div :class="{ 'hidden_bz': !show}" class="row justify-center" style="margin-bottom: 50px;">
    <spinner name="dots" slot="message" :size="30"></spinner>
  </div>
</template>

<script>
  export default {
    props: ['show'],
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
        // code that assumes this.$el is in-document
      })
    },
    methods: {
    }
  }
</script>

<style scoped>
</style>
