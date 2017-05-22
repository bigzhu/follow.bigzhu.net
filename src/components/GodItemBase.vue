<template>
</template>

<script>
  import _ from 'lodash'
  import btoa from '../functions/encode_url'
  import myautolinker from '../functions/myautolinker'
  export default {
    props: [],
    components: {
    },
    computed: {
      max_social: function () {
        return _.maxBy([this.god.twitter, this.god.instagram, this.god.github, this.god.tumblr, this.god.facebook], function (o) { return o.count || 0 })
      },
      description: function () {
        return this.now_description || myautolinker(this.max_social.description, this.max_social.type)
      },
      avatar: function () {
        return '/api_sp/' + btoa(this.now_avatar || this.max_social.avatar)
      }
    },
    data: function () {
      return {
        now_avatar: '',
        now_description: ''
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      setNow: function (social) {
        this.now_avatar = social.avatar
        this.now_description = myautolinker(social.description, social.type)
      }
    }
  }
</script>

<style>
</style>
