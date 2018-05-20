<template>
  <div :class="{'center-container-bz':$q.platform.is.mobile}">
    <div class="description" v-html="text">
    </div>
    <a v-for="(src,index) in message.medias" v-if="message.media_type==='photo'" :key="'image-'+index" @click="openImg(src)" href='javascript:void(0)'>
        <img :src="src" class="responsive">
    </a>
    <video v-for="(url,index) in message.medias" v-if="message.media_type==='gif' || message.media_type==='video'" :key="index" :loop="message.media_type==='gif'" :autoplay="message.media_type==='gif'" :controls="message.media_type!='gif'" type='video/mp4'>
        <source :src="proxy(url)">
    </video>
  </div>

</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['message'],
    computed: {
      text: function() {
        return myautolinker(this.message.text, this.message.social)
      }
    },
    methods: {
      openImg: function(img_url) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(img_url, '_blank')
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
      display inherit // 避免 url 撑开 message, 导致手机屏幕左右滑动
</style>

<style lang="stylus" scoped>

  video, img.responsive
    padding-top 1em
  video
    max-width 100%
    max-height 40rem
</style>
