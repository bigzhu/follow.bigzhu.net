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
  import _ from 'lodash'
  import myautolinker from '../functions/myautolinker'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['message'],
    data: function() {
      return {}
    },
    computed: {
      medias: function() {
        if (this.message.extended_entities) {
          return _.map(this.message.extended_entities.media,
            function(d) {
              // var height, img_height, img_url, img_width, t
              var img_url = d.media_url_https + ':orig'
              var videos = []
              var type = ''
              if (d.video_info) {
                // 找出类型是mp4,并且像素最好的
                // videos = [d.video_info.variants[0]]
                videos = _.filter(d.video_info.variants, {
                  content_type: 'video/mp4'
                })
                if (videos.length > 1) {
                  let video = _.maxBy(videos, function(v) {
                    return v.bitrate
                  })
                  videos = [video] // 还是封成 list ，为遵循多视频考虑
                }

                if (d.type === 'animated_gif') {
                  type = 'gif'
                }
              }
              var t = {
                img_url: img_url,
                videos: videos,
                type: type
              }
              return t
            }
          )
        }
      },
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

<style scoped>
  video, img.responsive {
    padding-top: 1em
  }
  video {
    max-width: 100%;
    max-height: 40rem;
  }
</style>
