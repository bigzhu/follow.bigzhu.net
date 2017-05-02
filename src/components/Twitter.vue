<template>
  <div>
    <div class="description" v-html="text">
    </div>
    <div v-for="media in medias">
      <a @click="openImg(media.img_url)" href='javascript:void(0)'>
        <img v-show="media.videos.length===0" :src="media.img_url" class="responsive" >
      </a>
      <video v-for="video in media.videos" :loop="media.type==='gif'" :autoplay="media.type==='gif'" :controls="media.type!='gif'" type='video/mp4'>
        <source :src="video.url">
      </video>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'
  import myautolinker from '../functions/myautolinker'
  export default {
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
              // var height, img_height, img_url, img_width, t
              var img_url = (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(d.media_url_https + ':orig'))
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

              // img_height = d.sizes.medium.h
              // img_width = d.sizes.medium.w
              // height = getFitHeightForSemantic(img_height, img_width)
              // if (height > img_height) {
              //   height = img_height
              // }
              var t = {
                img_url: img_url,
                videos: videos,
                type: type
                // height: height
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
      openImg: function (img_url) {
        if (this.$route.name === 'TheMessage') { // 在 TheMessage 还点了图，就在新页中打开图
          window.open(img_url, '_blank')
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
