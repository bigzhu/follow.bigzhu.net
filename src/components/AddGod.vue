<template>
  <div>
    <a v-show="stat==='button'||stat==='adding'" @click="showAddStarInput" href="javascript:void(0)">
      <i>add</i>{{ $t('AddStar.addnewstar') }}
    </a>
    <div v-show="stat==='input'" class="ui action input row">
      <div class="floating-label">
        <input @keyup.13="add" v-model="inputName" required class="">
        <label>{{$t('AddStar.example')}}</label>
        <a @click="add" href="javascript:;">{{ $t('AddStar.add') }}<i>keyboardArrowRight</i></a>
      </div>
    </div>
    <div v-show="stat==='adding'" class="ui segment newstar-info recommand-star-bz star-item">
      <div v-show="adding" class="ui active inverted dimmer">
        <div class="ui text loader">{{ $t('AddStar.adding') }}</div>
      </div>
      <div class="ui stackable grid">
        <div class="six wide column">
          <div class="star-avatar-bz">
            <router-link :to="{ name: 'Star', params: { StarName: StarName }}" class="header star-name-bz user-name-a">
              <img :src="proxy(avatar)" class="avatar-img-bz">
            </router-link>
          </div>
        </div>
        <div class="ten wide column">
          <div class="star-detail-bz">
            <div class="star-icon-bz">
              <social-badge :loading="twitterLoading" :info="twitterInfo"></social-badge>
              <social-badge :loading="githubLoading" :info="githubInfo"></social-badge>
              <social-badge :loading="instagramLoading" :info="instagramInfo"></social-badge>
              <social-badge :loading="tumblrLoading" :info="tumblrInfo"></social-badge>
              <social-badge :loading="facebookLoading" :info="facebookInfo"></social-badge>
            </div>
            <router-link :to="{ name: 'Star', params: { StarName: StarName }}" class="header newstar-name user-name-a">
              <h3>{{StarName}}</h3>
            </router-link>
            <a class="followers-number-bz">
              {{ $t('AddStar.follownumber') }}
            </a>
            <div class="star-discription-bz" v-html="description"></div>
            <follow :class="{'disabled': disabled}" v-model="starInfo.following" :starID="0"
                    class="button-to-follow-bz"></follow>
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
                starInfo: {},
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
        mounted() {
        },
        methods: {
            showAddStarInput: function () {
                this.inputName = '' // 清空上次的输入
                this.stat = 'input'
                this.$nextTick()
                // 这时要重新取一下star，以处理连续添加的情况
                // 先不取了，连续添加很少见
                // this.queryNotMyStars(this.$route.params.cat)
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
                // this.addStar(this.StarName, this.$route.params.cat, this.startCheck)
                this.$store.dispatch('postStar', {
                    Name: this.StarName,
                    Cat: this.$route.params.cat
                }).then(function (data) {
                    self.startCheck(data.starInfo)
                })
            },
            startCheck: function (starInfo) {
                this.setStarInfo(starInfo)
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
                this.createStar()
                this.$store.commit('UNSHIFT_MY_GOD', {
                    cat: this.cat,
                    star: this.starInfo
                })
                // this.$store.dispatch('queryCat')
                this.stat = 'button'
                this.$emit('addDone', this.starInfo)
                this.starInfo = {}
            },
            setStarSocial: function (type) {
                if (this[type + '_info'].count !== -4) {
                    this.starInfo[type] = this.StarName
                    this.starInfo[type + '_user'] = this[type + '_info']
                }
            },
            createStar: function () {
                this.setStarSocial('twitter')
                this.setStarSocial('github')
                this.setStarSocial('tumblr')
                this.setStarSocial('instagram')
                this.setStarSocial('facebook')
                this.starInfo.followingAt = window.Date.now() // 当前时间做为follow时间,才会排前面
            },
            setStarInfo: function (starInfo) {
                this.starInfo = starInfo
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
  .ui.segment.add-newstar-bz.new-star-bz {
    margin-top: 1.8rem;
  }
</style>
