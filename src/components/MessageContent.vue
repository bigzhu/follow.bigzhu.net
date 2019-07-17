<template>
  <q-card-section :class="{'center-container-bz':$q.platform.is.mobile}">
    <div class="description" v-html="text">
    </div>
    <template v-for="(src,index) in message.Medias">
      <a v-if="message.MediaType==='photo'" :key="'image-'+index" @click="openImg(src)" href='javascript:void(0)'>
        <img :src="encodeFile(src)" class="responsive">
      </a>
      <video v-if="message.MediaType==='gif' || message.MediaType==='video'" :key="index" :loop="message.MediaType==='gif'" :autoplay="message.MediaType==='gif'" :controls="message.MediaType!='gif'" type='video/mp4'>
        <source :src="encodeFile(src)">
      </video>
    </template>
  </q-card-section>
</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['message'],
    computed: {
      text: function () {
        return myautolinker(this.message.Text, this.message.Social)
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
              id: this.message.ID
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
