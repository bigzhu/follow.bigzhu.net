<template>
  <div :class="{ 'popup': popup, 'transition': popup, 'centered': !popup }" class="ui card column card-radius">
    <div v-show="god.godID === 0" class="ui active inverted dimmer">
      <div class="ui text loader">{{$t('Loading.loading')}}</div>
    </div>
    <div v-show="god.name==''" class="ui active inverted dimmer">
      <div class="ui text loader">{{$t('Loading.loading')}}</div>
    </div>

    <a @click="go(god.name)" :class="{'ui': popup, 'small': popup, 'centered': popup}" class="image">
      <img :src="proxy(avatar)" class="ui centered image avatar-bz">
    </a>
    <div class="content delete-border">
      <a @click="go(god.name)" class="user-name-a">
        <h3>{{god.name}}</h3>
      </a>
      <div class="description" v-html="desc"></div>
    </div>
    <div class="extra content god-icon-bz delete-border">
      <social-badge v-show="god.twitterUser" :callBack="setGodInfo" :info="god.twitterUser"></social-badge>
      <social-badge v-show="god.githubUser" :callBack="setGodInfo" :info="god.githubUser"></social-badge>
      <social-badge v-show="god.tumblrUser" :callBack="setGodInfo" :info="god.tumblrUser"></social-badge>
      <social-badge v-show="god.instagramUser" :callBack="setGodInfo" :info="god.instagramUser"></social-badge>
      <social-badge v-show="god.facebookUser" :callBack="setGodInfo" :info="god.facebookUser"></social-badge>
    </div>
    <follow class="attached" v-model="god.following" :godID="god.godID"></follow>
  </div>
</template>

<script>
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'
  import Proxy from './Proxy'
  export default {
    mixins: [Proxy],
    props: ['god', 'popup'],
    watch: {
      'god': {
        handler: function (val, oldVal) { this.setGodInfo() },
        deep: true
      }
    },
    mounted() {
      this.setGodInfo()
    },
    computed: {
      avatar: function () {
        if (!this.av) {
          return ''
        }
        return this.av
      }
    },
    components: {
      SocialBadge,
      Follow
    },
    data: function () {
      return {
        av: '',
        desc: ''
      }
    },
    methods: {
      setGodInfo: function (type) {
        if (type) {
          this.av = this.god[type + '_user'].avatar
          this.desc = this.god[type + '_user'].description
        } else {
          if (this.god.twitterUser) {
            this.setGodInfo('twitter')
          } else if (this.god.githubUser) {
            this.setGodInfo('github')
          } else if (this.god.tumblrUser) {
            this.setGodInfo('tumblr')
          } else if (this.god.instagramUser) {
            this.setGodInfo('instagram')
          } else if (this.god.facebookUser) {
            this.setGodInfo('facebook')
          }
        }
      },
      go: function (StarName) {
        this.$router.push({ name: 'God', params: { StarName: StarName } })
      }
    }
  }
</script>

<style>
  .ui.cards>.card>.image>.avatar-bz,
  .ui.card>.image>.avatar-bz {
    width: auto;
    max-width: 100%;
  }

  .ui.card>.extra.god-icon-bz a:not(.ui):hover,
  .ui.cards>.card>.extra.god-icon-bz a:not(.ui):hover {
    color: #999999;

    i.icon.icon-hover-twitter {
      color: #41ABE1;
      transition: color 0.3s linear;
    }

    i.icon.icon-hover-github {
      color: rgba(0, 0, 0, 0.8);
      transition: color 0.3s linear;
    }

    i.icon.icon-hover-instagram {
      color: #7E4532;
      transition: color 0.3s linear;
    }

    i.icon.icon-hover-tumblr {
      color: #205081;
      transition: color 0.3s linear;
    }

    i.icon.icon-hover-facebook {
      color: #3B5998;
      transition: color 0.3s linear;
    }
  }

  .ui.card.card-radius {
    border-radius: 0.06em 0.06em 0.3em 0.3em;
  }

  .ui.card>.content.delete-border {
    border-top: none;
  }

  .ui.card>.extra.delete-border {
    border-top: none !important;
  }
</style>
