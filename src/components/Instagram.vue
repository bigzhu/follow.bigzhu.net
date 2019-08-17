<template>
  <div :class="{'center-container-bz':$q.platform.is.mobile}">
    <div class="description word-wrap-bz" v-html="description"></div>
    <a v-for="(image,index) in message.images" :key="index" v-if="type==='image'" @click="openImg(image)">
      <q-alert icon="fab fa-instagram" v-if="image=='error'" color="secondary">图片地址被 instagram 重置失效了!</q-alert>
      <img :src="changeImgURL(image)" class="responsive" v-if="image!='error'">
    </a>

    <!--
    <a v-for="(image, index) in message.extendedEntities" :key="index" v-if="type==='images'" @click="openImg(proxy(image.url))">
      <img :src="proxy(image.url)" class="responsive">
    </a>
    <a v-if="type==='image'" @click="openImg(proxy(message.extendedEntities.url))">
      <img :src="proxy(message.extendedEntities.url)" class="responsive">
    </a>
    -->
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
        if (this.message.extendedEntities && this.message.type === 'video') {
          return this.message.extendedEntities.videoUrl
        }
        return ''
      },
      // height: function () {
      //   var imgHeight, imgWidth, realHeight
      //   imgHeight = this.message.extendedEntities.height
      //   imgWidth = this.message.extendedEntities.width
      //   realHeight = getFitHeightForSemantic(imgHeight, imgWidth)
      //   return realHeight
      // },
      description: function () {
        return myautolinker(this.message.text, 'instagram')
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

<style scoped>
  video,
  img.responsive {
    padding-top: 1rem
  }

  video {
    max-width: 100%;
    max-height: 40rem;
  }
</style>
