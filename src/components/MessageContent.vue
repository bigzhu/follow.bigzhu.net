<template>
  <div :class="{'center-container-bz':$q.platform.is.mobile}">
    <div class="description" v-html="text">
    </div>
    <template v-for="(src,index) in message.medias">
      <a v-if="message.mediaType==='photo'" :key="'image-'+index" @click="openImg(src)" href='javascript:void(0)'>
        <img :src="encodeFile(src)" class="responsive">
      </a>
      <video v-if="message.mediaType==='gif' || message.mediaType==='video'" :key="index" :loop="message.mediaType==='gif'" :autoplay="message.mediaType==='gif'" :controls="message.mediaType!='gif'" type='video/mp4'>
        <source :src="encodeFile(src)">
      </video>
    </template>
  </div>
</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['message'],
    computed: {
      text: function () {
        return myautolinker(this.message.text, this.message.social)
      }
    },
    methods: {
      openImg: function (imgURL) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(imgURL, '_blank')
        } else {
          this.$router.push({
            name: 'TheMessage',
            params: {
              id: this.message.id
            }
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
// description 的内容是后来渲染的, 无法应用 scoped 特性
  .description
    a
      // 避免 url 撑开 message, 导致手机屏幕左右滑动
      word-wrap break-word
      word-break break-all
</style>
