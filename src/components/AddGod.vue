<template>
  <div>
    <a v-show="stat==='button'||stat==='adding'" @click="showAddGodInput" href="javascript:void(0)">
      <i>add</i>{{ $t("AddGod.addnewgod") }}
    </a>
    <div v-show="stat==='input'" class="ui action input row">
      <div class="floating-label">
        <input @keyup.13="add" v-model="inputName" required class="">
        <label>{{$t('AddGod.example')}}</label>
        <a @click="add" href="javascript:;">{{ $t("AddGod.add") }}<i>keyboardArrowRight</i></a>
      </div>
    </div>
    <div v-show="stat==='adding'" class="ui segment newgod-info recommand-god-bz god-item">
      <div v-show="adding" class="ui active inverted dimmer">
        <div class="ui text loader">{{ $t("AddGod.adding") }}</div>
      </div>
      <div class="ui stackable grid">
        <div class="six wide column">
          <div class="god-avatar-bz">
            <router-link :to="{ name: 'God', params: { StarName: StarName }}" class="header god-name-bz user-name-a">
              <img :src="proxy(avatar)" class="avatar-img-bz">
            </router-link>
          </div>
        </div>
        <div class="ten wide column">
          <div class="god-detail-bz">
            <div class="god-icon-bz">
              <social-badge :loading="twitterLoading" :info="twitterInfo"></social-badge>
              <social-badge :loading="githubLoading" :info="githubInfo"></social-badge>
              <social-badge :loading="instagramLoading" :info="instagramInfo"></social-badge>
              <social-badge :loading="tumblrLoading" :info="tumblrInfo"></social-badge>
              <social-badge :loading="facebookLoading" :info="facebookInfo"></social-badge>
            </div>
            <router-link :to="{ name: 'God', params: { StarName: StarName }}" class="header newgod-name user-name-a">
              <h3>{{StarName}}</h3>
            </router-link>
            <a class="followers-number-bz">
              {{ $t("AddGod.follownumber") }}
            </a>
            <div class="god-discription-bz" v-html="description"></div>
            <follow :class="{'disabled': disabled}" v-model="godInfo.following" :godID="0" class="button-to-follow-bz"></follow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'
  import Proxy from './Proxy'

  export default {
    mixins: [Proxy],
    components: {
      SocialBadge,
      Follow
    },
    data: function () {
      return {
        StarName: '',
        inputName: '',
        stat: 'button',
        godInfo: {},
        twitterInfo: {
          type: 'twitter',
          count: -4
        },
        githubInfo: {
          type: 'github',
          count: -4
        },
        tumblrInfo: {
          type: 'tumblr',
          count: -4
        },
        instagramInfo: {
          type: 'instagram',
          count: -4
        },
        facebookInfo: {
          type: 'facebook',
          count: -4
        },

        disabled: true,
        adding: false,
        description: '',
        avatar: '',
        twitterLoading: false,
        githubLoading: false,
        instagramLoading: false,
        tumblrLoading: false,
        facebookLoading: false
      }
    },
    computed: {
      cat: function () {
        return this.$route.params.cat
      }
    },
    mounted() {},
    methods: {
      showAddGodInput: function () {
        this.inputName = '' // 清空上次的输入
        this.stat = 'input'
        this.$nextTick()
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      init: function () {
        this.twitterInfo = {
          type: 'twitter',
          count: -4
        }
        this.githubInfo = {
          type: 'github',
          count: -4
        }
        this.tumblrInfo = {
          type: 'tumblr',
          count: -4
        }
        this.instagramInfo = {
          type: 'instagram',
          count: -4
        }
        this.facebookInfo = {
          type: 'facebook',
          count: -4
        }
        this.disabled = true
        this.adding = false
        this.description = ''
        this.avatar = ''
        this.twitterLoading = false
        this.githubLoading = false
        this.instagramLoading = false
        this.tumblrLoading = false
        this.facebookLoading = false
      },
      add: function () {
        this.init()
        this.StarName = this.inputName.trim()
        this.stat = 'adding'
        let self = this
        this.adding = true
        // this.addGod(this.StarName, this.$route.params.cat, this.startCheck)
        this.$store.dispatch('postGod', {
          Name: this.StarName,
          Cat: this.$route.params.cat
        }).then(function (data) {
          self.startCheck(data.godInfo)
        })
      },
      startCheck: function (godInfo) {
        this.setGodInfo(godInfo)
        this.adding = false
        this.twitterLoading = true
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'twitter'
        }).then(function (data) {
          self.twitterDone(data.info)
        })
      },
      twitterDone: function (info) {
        this.twitterLoading = false
        if (info) {
          this.twitterInfo = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'github'
        }).then(function (data) {
          self.githubDone(data.info)
        })
        this.githubLoading = true
      },
      githubDone: function (info) {
        this.githubLoading = false
        if (info) {
          this.githubInfo = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'instagram'
        }).then(function (data) {
          self.instagramDone(data.info)
        })
        this.instagramLoading = true
      },
      instagramDone: function (info) {
        this.instagramLoading = false
        if (info) {
          this.instagramInfo = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'tumblr'
        }).then(function (data) {
          self.tumblrDone(data.info)
        })
        this.tumblrLoading = true
      },
      tumblrDone: function (info) {
        this.tumblrLoading = false
        if (info) {
          this.tumblrInfo = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'facebook'
        }).then(function (data) {
          self.facebookDone(data.info)
        })
        this.facebookLoading = true
      },
      facebookDone: function (info) {
        this.facebookLoading = false
        if (info) {
          this.facebookInfo = info
          this.setInfo(info)
        }
        this.allDone()
      },
      allDone: function (info) {
        this.disabled = false
        this.createGod()
        this.$store.commit('UNSHIFT_MY_GOD', {
          cat: this.cat,
          god: this.godInfo
        })
        // this.$store.dispatch('queryCat')
        this.stat = 'button'
        this.$emit('addDone', this.godInfo)
        this.godInfo = {}
      },
      setGodSocial: function (type) {
        if (this[type + '_info'].count !== -4) {
          this.godInfo[type] = this.StarName
          this.godInfo[type + '_user'] = this[type + '_info']
        }
      },
      createGod: function () {
        this.setGodSocial('twitter')
        this.setGodSocial('github')
        this.setGodSocial('tumblr')
        this.setGodSocial('instagram')
        this.setGodSocial('facebook')
        this.godInfo.followingAt = window.Date.now() // 当前时间做为follow时间,才会排前面
      },
      setGodInfo: function (godInfo) {
        this.godInfo = godInfo
      },
      setInfo: function (info) {
        if (info.avatar) {
          this.avatar = info.avatar
        }
        if (info.description) {
          this.description = info.description
        }
      }
    }
  }
</script>

<style>
  .ui.segment.add-newgod-bz.new-god-bz {
    margin-top: 1.8rem;
  }
</style>
