<template>
  <div></div>
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
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      changeImgURL: function (imgURL) {
        return imgURL.replace('s18.postimg.org', 's18.postimg.cc')
      },
      proxy: function (url) {
        if (!url) {
          return ''
        }
        // let pUrl = window.btoa(window.btoa(url))
        // return '/apiSp/' + pUrl
        // return '/p?url=' + encodeURIComponent(url)
        return '/p/' + url
      },
      encodeFile: function (url) {
        var filename = url.substring(url.lastIndexOf('/') + 1)
        // ! 下载时候保存的用户名可能带着 url 参数, 比如 medias/DanBilzerian/twitter/q0uzbK2fm6a2UQsb.mp4?tag=5
        // ! 传递到 nginx 时候 ?tag=5 会被忽略, 所以需要编码
        // nginx 一旦 rewrite 就会自动 decode, 导致这个方法无效, 下载时候就剔除特殊字符来解决, 这个方法用不上
        filename = encodeURIComponent(encodeURIComponent(filename))
        var path = url.substring(0, url.lastIndexOf('/'))
        return path + '/' + filename
      }
    }
  }
</script>

<style>

</style>
