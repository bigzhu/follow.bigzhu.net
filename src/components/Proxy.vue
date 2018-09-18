<template>
  <div></div>
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
      changeImgURL: function (img_url) {
        return img_url.replace('s18.postimg.org', 's18.postimg.cc')
      },
      proxy: function (url) {
        if (!url) {
          return ''
        }
        // let p_url = window.btoa(window.btoa(url))
        // return '/api_sp/' + p_url
        // return '/p?url=' + encodeURIComponent(url)
        return '/p/' + url
      }
      encodeFile: function (url) {
        var filename = url.substring(url.lastIndexOf('/')+1)
        // 下载时候保存的用户名可能带着 url 参数, 比如 medias/DanBilzerian/twitter/q0uzbK2fm6a2UQsb.mp4?tag=5
				// 传递到 nginx 时候 ?tag=5 会被忽略, 所以需要编码
        filename =encodeURI(filename)
        var path = url.substring(0, url.lastIndexOf("/"));
				return path+'/'+filename
      }
    }
  }
</script>

<style>
</style>
