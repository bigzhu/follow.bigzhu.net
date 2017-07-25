<template>
</template>

<script>
  import {
    QCardTitle,
    QCardActions,
    QCardMain,
    QItem,
    QCardMedia,
    QItemSide,
    QItemTile,
    QItemMain,
    QCard
  } from 'quasar'
  import Follow from './Follow'
  import _ from 'lodash'
  import myautolinker from '../functions/myautolinker'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  export default {
    components: {
      QCardTitle,
      QCardActions,
      QCardMain,
      QItem,
      QCardMedia,
      QItemSide,
      QItemTile,
      QItemMain,
      QCard,
      SocialBadge,
      Follow,
      GodRemark
    },
    computed: {
      remark: function() {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      },
      max_social: function () {
        if (this.god.id === 0) return {}
        return _.maxBy([this.god.twitter, this.god.instagram, this.god.github, this.god.tumblr, this.god.facebook], function (o) { return o.count || 0 })
      },
      description: function () {
        return myautolinker(this.now_description, this.now_type) || myautolinker(this.max_social.description, this.max_social.type)
      },
      avatar: function () {
        if (this.now_avatar || this.max_social.avatar) {
          return this.now_avatar || this.max_social.avatar
        }
      }
    },
    data: function () {
      return {
        now_avatar: '',
        now_description: '',
        now_type: 'twitter'
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      showBadge: function(social) {
        if (!social) return ''
        return social.name && social.count
      },
      setNow: function (social) {
        this.now_avatar = social.avatar
        this.now_description = myautolinker(social.description, social.type)
      }
    }
  }
</script>

<style>
</style>
