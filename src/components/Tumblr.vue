<template>
  <div :class="{'center-container-bz':$q.platform.is.mobile}">
    <h3 v-show="message.title" class="ui center aligned header">
      {{message.title}}
    </h3>
    <div class="description" v-html="text"></div>
    <template v-for="(media, index) in medias" :media="media">
      <div class="description" v-html="media.caption" :key="'description-'+index"></div>
      <a @click="openImg(proxy(media.imgUrl))" :key="'a-'+index">
        <img :src="proxy(media.imgUrl)" class="responsive">
      </a>
      <br :key="'br-'+index">
    </template>
    <video v-if="video" :controls="true" type='video/mp4'>
      <source :src="proxy(video)">
    </video>
  </div>
</template>

<script>
  import _ from 'lodash'
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'

  export default {
    mixins: [Proxy],
    props: ['message'],
    computed: {
      medias: function () {
        if (this.message.extendedEntities && this.message.type === 'photo') {
          return _.map(
            this.message.extendedEntities,
            function (d) {
              // var caption, height, imgHeight, imgUrl, imgWidth, t
              var imgUrl = d.originalSize.url
              // imgUrl = d.originalSize.url
              // imgHeight = d.originalSize.height
              // imgWidth = d.originalSize.width
              // height = getFitHeightForSemantic(imgHeight, imgWidth)
              var t = {
                imgUrl: imgUrl,
                // height: height,
                caption: d.caption
              }
              return t
            }
          )
        }
      },
      text: function () {
        if (this.message.text !== null) {
          return myautolinker(this.message.text, 'tumblr')
        }
        if (this.message.type === 'link') {
          return myautolinker(this.message.href, 'tumblr')
        }
      },
      video: function () {
        if (this.message.extendedEntities && this.message.type === 'video') {
          return this.message.extendedEntities.videoUrl
        }
      }
    },
    methods: {
      openImg: function (imgUrl) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(imgUrl, '_blank')
        } else {
          this.$router.push({ name: 'TheMessage', params: { id: this.message.id } })
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
