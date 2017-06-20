<template>
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
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      proxy: function (url) {
        // let p_url = window.btoa(window.btoa(url))
        // return '/api_sp/' + p_url
        // return '/p?url=' + encodeURIComponent(url)
        return '/p/' + url
      }
    }
  }
</script>

<style>
</style>
