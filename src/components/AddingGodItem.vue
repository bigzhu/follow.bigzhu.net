<template>
  <q-card class="bz the-hover-bz">
    <q-spinner-puff v-show="loading" name="puff" color="#000000" size="17rem" class="spinner" />
    <q-icon :name="getIcon()" class="social-icon"></q-icon>

    <q-item>
      <router-link :to="{ name: 'God', params: { StarName: god.name }}">
        <q-item-section :avatar="god.avatar||'/statics/assets/avatar.svg'" />
      </router-link>
      <q-item-label>
        <router-link :to="{ name: 'God', params: { StarName: god.name }}">
          <q-item-section label>{{god.name}}</q-item-section>
        </router-link>
        <q-item-section sublabel>
          {{god.followingCount||1}} {{ $t("人关注") }}
        </q-item-section>
      </q-item-label>
    </q-item>

    <q-card-title>
      <div slot="subtitle">
        <social-badge @click.native="setNow(god.twitter)" v-show="haveSocial('twitter')" type="twitter" :info="god.twitter" />
        <social-badge @click.native="setNow(god.github)" v-show="haveSocial('github')" type="github" :info="god.github" />
        <social-badge @click.native="setNow(god.tumblr)" v-show="haveSocial('tumblr')" type="tumblr" :info="god.tumblr" />
        <social-badge @click.native="setNow(god.instagram)" v-show="haveSocial('instagram')" type="instagram" :info="god.instagram" />
        <social-badge @click.native="setNow(god.facebook)" v-show="haveSocial('facebook')" type="facebook" :info="god.facebook" />
      </div>
    </q-card-title>

    <q-card class="card-content green-bz">
      <p v-html="bio"></p>
      <GodRemark v-model="god.remark" :godID="god.id" class="card-content green-bz remark"></GodRemark>
    </q-card>
    <q-card-actions align="end">
    </q-card-actions>
  </q-card>
</template>

<script>
  import {
    QIcon,
    QSpinnerPuff
  } from 'quasar'
  import GodItem from './GodItem'
  import SocialBadge from './SocialBadge'

  export default {
    mixins: [GodItem],
    props: ['StarName'],
    watch: {
      'StarName': function () {
        if (this.StarName === '') {
          return
        }
        this.init()
        this.getStarInfo()
      }
    },
    components: {
      QIcon,
      QSpinnerPuff,
      SocialBadge
    },
    data: function () {
      return {
        loading: false,
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
      // 是否有这个社交类型
      haveSocial: function (social) {
        return true
      },
      getIcon: function () {
        if (this.twitterLoading) return 'fa-twitter'
        if (this.githubLoading) return 'fa-github'
        if (this.instagramLoading) return 'fa-instagram'
        if (this.tumblrLoading) return 'fa-tumblr'
        if (this.facebookLoading) return 'fa-facebook'
        return ''
      },
      init: function () {
        this.god.name = this.StarName
      },
      showAddGodInput: function () {
        this.inputName = '' // 清空上次的输入
        this.$nextTick()
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      getStarInfo: function () {
        this.loading = true
        this.$store.dispatch('postGod', {
          Name: this.StarName,
          Cat: this.cat
        }).then((godInfo) => {
          this.startCheck(godInfo)
        })
      },
      startCheck: function (godInfo) {
        this.setStarInfo(godInfo)
        this.adding = false
        this.twitterLoading = true
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'twitter'
        }).then(function (data) {
          self.twitterDone(data)
        })
      },
      twitterDone: function (info) {
        this.twitterLoading = false
        if (info) {
          this.god.twitter = info
          this.setInfo(info, 'twitter')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'github'
        }).then(function (data) {
          self.githubDone(data)
        })
        this.githubLoading = true
      },
      githubDone: function (info) {
        this.githubLoading = false
        if (info) {
          this.god.github = info
          this.setInfo(info, 'github')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'instagram'
        }).then(function (data) {
          self.instagramDone(data)
        })
        this.instagramLoading = true
      },
      instagramDone: function (info) {
        this.instagramLoading = false
        if (info) {
          this.god.instagram = info
          this.setInfo(info, 'instagram')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          Name: this.StarName,
          Type: 'tumblr'
        }).then(function (data) {
          self.tumblrDone(data)
        })
        this.tumblrLoading = true
      },
      tumblrDone: function (info) {
        this.tumblrLoading = false
        if (info) {
          this.god.tumblr = info
          this.setInfo(info, 'tumblr')
        }
        this.allDone()
      },
      facebookDone: function (info) {
        this.facebookLoading = false
        if (info) {
          this.god.facebook = info
          this.setInfo(info, 'facebook')
        }
        this.allDone()
      },
      allDone: function (info) {
        this.loading = false
        // Object.assign(this.godInfo, this.god)
        this.god.followingAt = window.Date.now() // 当前时间做为follow时间,才会排前面
        this.god.following = 1
        this.$store.commit('unshiftMyGod', {
          cat: this.cat,
          god: this.god
        })
        this.$emit('addDone', this.god)
        this.init()
      },
      setStarInfo: function (god) {
        this.god = god
      },
      setInfo: function (info, type) {
        if (info.avatar) {
          this.nowAvatar = info.avatar
        }
        if (info.description) {
          this.nowDescription = info.description
        }
        this.nowType = type
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-card
    .q-spinner
      z-index 99 // 让 spinner 不要被遮住
    position: relative // 让spinner absolute 定位时能在 card 里
    display: inline-block
    width: 20.9rem
    min-height: 20.9rem
    @media (max-width: 920px)
      min-width 100%
  .q-item-section img // 改大小
    width 6rem
    height 6rem
    margin-right 1rem
    margin-top 1rem

  .spinner
    position: absolute
    // 居中方法1
    // left: 50%; top: 50%;
    // transform: translate(-50%, -50%);
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;    /* 有了这个就自动居中了 */

  .q-icon.social-icon
    font-size: 3rem;
    position: absolute;
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;    /* 有了这个就自动居中了 */

  .title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .width-2of5 {
    /* 居中头像 */
    height: 17rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .item>.item-secondary.stamp {
    width: auto;
  }
</style>
