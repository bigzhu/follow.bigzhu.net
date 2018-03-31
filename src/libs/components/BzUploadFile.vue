<template>
  <div @click="click">
    <slot></slot>
    <input type="file" @change="changeFile" :accept="accept" style="display: none" />
  </div>
</template>

<script>
  import lrz from 'lrz'
  export default {
    props: {
      zip: { // 是否压缩图片
        type: Boolean,
        default: false
      },
      upload_url: { // 上传的 url
        type: String,
        default: '/api_file_upload'
      },
      accept: { // 上传类型
        type: String,
        default: '*'
      }
    },
    components: {},
    data: function() {
      return {
        file_input: null
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        this.file_input = this.$el.getElementsByTagName('input')[0]
      })
    },
    methods: {
      changeFile: function(e) {
        this.$emit('change_file', e)
        this.uploadFile()
      },
      fetchFile: function(fd) {
        let self = this
        return fetch(this.upload_url, {
            method: 'post',
            body: fd
          })
          .then(function(response) {
            if (response.status !== 200) {
              throw new Error(response.url + ' ' + response.status + ' ' + response.statusText)
            }
            return response.json()
          })
          .then(function(data) {
            let url = ''
            let name = ''
            if (data.urls) {
              url = data.urls[0].url // 律品的返回格式, 只取 url
              name = data.urls[0].name
            }
            if (data.file_path) url = data.file_path // 以前的返回格式
            self.$emit('upload_done', url, name)
            return data
          })
        // .catch(function(error) {
        //   console.log('Request failed', error)
        //   throw new Error(error)
        // })
      },
      uploadFile: function() {
        let self = this
        let file = this.file_input.files[0]
        if (file) {
          if (this.zip) {
            lrz(file)
              .then(function(rst) {
                // 处理成功会执行
                self.fetchFile(rst.formData)
              })
              .catch(function(err) {
                // 处理失败会执行
                throw new Error(err)
              })
              .always(function() {
                // 不管是成功失败，都会执行
              })
          } else {
            let fd = new window.FormData()
            fd.append('file', file)
            self.fetchFile(fd)
          }
        }
      },
      click: function() {
        this.file_input.click()
      }
    },
    computed: {}
  }
</script>

<style lang="stylus" scoped>
</style>
