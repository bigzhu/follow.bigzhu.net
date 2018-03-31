<template>
  <div>
    <div class="description" v-html="text">
    </div>
    <div v-for="(media,index) in medias" :key="index">
      <a @click="openImg(media.imgUrl)" href='javascript:void(0)'>
        <img v-show="media.videos.length===0" :src="proxy(media.imgUrl)" class="responsive" >
      </a>
      <video v-for="(video,index) in media.videos" :key="index" :loop="media.type==='gif'" :autoplay="media.type==='gif'" :controls="media.type!='gif'" type='video/mp4'>
        <source :src="proxy(video.url)">
      </video>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['message'],
    data: function () {
      return {
      }
    },
    computed: {
      medias: function () {
        if (this.message.extended_entities) {
          return _.map(this.message.extended_entities.media,
            function (d) {
              // var height, img_height, imgUrl, img_width, t
              var imgUrl = d.media_url_https + ':orig'
              var videos = []
              var type = ''
              if (d.video_info) {
                // 找出类型是mp4,并且像素最好的
                // videos = [d.video_info.variants[0]]
                videos = _.filter(d.video_info.variants, {content_type: 'video/mp4'})
                if (videos.length > 1) {
                  let video = _.maxBy(videos, function (v) { return v.bitrate })
                  videos = [video] // 还是封成 list ，为遵循多视频考虑
                }

                if (d.type === 'animated_gif') {
                  type = 'gif'
                }
              }
              var t = {
                imgUrl: imgUrl,
                videos: videos,
                type: type
              }
              return t
            }
          )
        }
      },
      text: function () {
        return myautolinker(this.message.text, 'twitter')
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
    padding-top: 1em
  }
  video {
    max-width: 100%;
    max-height: 40rem;
  }
</style>
