<template>
  <div></div>
</template>

<script>
  export default {
    methods: {
      proxy: function (url) {
        if (!url) {
          return ''
        }
        return '/p/' + url
      }
    }
  }
</script>
