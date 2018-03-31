<template>
  <div>
    <div class="description word-wrap-bz" v-html="description"></div>
    <a v-for="(image, index) in message.extended_entities" :key="index" v-if="type==='images'" @click="openImg(proxy(image.url))">
      <img :src="proxy(image.url)" class="responsive">
    </a>
    <a v-if="type==='image'" @click="openImg(proxy(message.extended_entities.url))">
      <img :src="proxy(message.extended_entities.url)" class="responsive">
    </a>
    <video v-if="type==='video'" :controls="true" type='video/mp4'>
      <source :src="proxy(video)">
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
      type: function () {
        return this.message.type
      },
      video: function () {
        if (this.message.extended_entities && this.message.type === 'video') {
          return this.message.extended_entities.video_url
        }
      },
      // height: function () {
      //   var img_height, img_width, real_height
      //   img_height = this.message.extended_entities.height
      //   img_width = this.message.extended_entities.width
      //   real_height = getFitHeightForSemantic(img_height, img_width)
      //   return real_height
      // },
      description: function () {
        return myautolinker(this.message.text, 'instagram')
      }
    },
    methods: {
      openImg: function (imgUrl) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(imgUrl, '_blank')
        } else {
          this.$router.push({name: 'TheMessage', params: {id: this.message.id}})
        }
      }
    }
  }
</script>

<style scoped>
  video, img.responsive {
    padding-top: 1rem
  }
  video {
    max-width: 100%;
    max-height: 40rem;
  }
</style>
