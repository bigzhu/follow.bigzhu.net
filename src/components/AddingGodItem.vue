<template>
  <q-card class="bz the-hover-bz">
    <q-spinner-puff v-show="loading" name="puff" color="#000000" size="17rem" class="spinner" />
    <q-icon :name="getIcon()" class="icon social-icon"></q-icon>
      <router-link :to="{ name: 'God', params: { god_name: god.name }}" class="width-2of5">
        <img v-show="now_avatar||max_social.avatar" :src="avatar" class="responsive">
      </router-link>
        <div class="item two-lines">
          <div class="item-content has-secondary">
            <router-link :to="{ name: 'God', params: { god_name: god.name }}">
              <span class="title">{{god.name}}</span>
            </router-link>
          </div>

          <div class="item-secondary stamp">
            <social-badge @click.native="setNow(god.twitter)" v-show="god.twitter.count" type="twitter" :info="god.twitter"></social-badge>
            <social-badge @click.native="setNow(god.github)" v-show="god.github.count" type="github" :info="god.github"></social-badge>
            <social-badge @click.native="setNow(god.tumblr)" v-show="god.tumblr.count" type="tumblr" :info="god.tumblr"></social-badge>
            <social-badge @click.native="setNow(god.instagram)" v-show="god.instagram.count" type="instagram" :info="god.instagram"></social-badge>
            <social-badge @click.native="setNow(god.facebook)" v-show="god.facebook.count" type="facebook" :info="god.facebook"></social-badge>
          </div>
          <div v-html="description" class="card-content green-bz">
          </div>
        </div>
  </q-card>
</template>

<script>
  import {
    QIcon,
    QCard,
    QSpinnerPuff
  } from 'quasar'
  import CountUp from 'bz-count-up'
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'
  import GodItemBase from './GodItemBase'
  import god_data from '../datas/god'

  export default {
    mixins: [GodItemBase],
    props: ['god_name'],
    watch: {
      'god_name': function() {
        if (this.god_name === '') {
          return
        }
        this.init()
        this.getGodInfo()
      }
    },
    components: {
      QIcon,
      QCard,
      QSpinnerPuff,
      SocialBadge,
      CountUp,
      Follow
    },
    data: function() {
      return {
        god: god_data,
        loading: true,
        twitter_loading: false,
        github_loading: false,
        instagram_loading: false,
        tumblr_loading: false,
        facebook_loading: false
      }
    },
    computed: {
      cat: function() {
        return this.$route.params.cat
      }
    },
    mounted() {},
    methods: {
      getIcon: function() {
        if (this.twitter_loading) return 'fa_twitter'
        if (this.github_loading) return 'fa_github'
        if (this.instagram_loading) return 'fa_instagram'
        if (this.tumblr_loading) return 'fa_tumblr'
        if (this.facebook_loading) return 'fa_facebook'
        return ''
      },
      init: function() {
        this.god = god_data
        this.god.name = this.god_name
      },
      showAddGodInput: function() {
        this.input_name = '' // 清空上次的输入
        this.$nextTick()
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      getGodInfo: function() {
        let self = this
        this.loading = true
        this.$store.dispatch('postGod', {
          name: this.god_name,
          cat: this.cat
        }).then(function(data) {
          self.startCheck(data.god_info)
        })
      },
      startCheck: function(god_info) {
        this.setGodInfo(god_info)
        this.adding = false
        this.twitter_loading = true
        let self = this
        this.$store.dispatch('checkSocial', {
          name: this.god_name,
          type: 'twitter'
        }).then(function(data) {
          self.twitterDone(data.info)
        })
      },
      twitterDone: function(info) {
        this.twitter_loading = false
        if (info) {
          this.god.twitter = info
          this.setInfo(info, 'twitter')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          name: this.god_name,
          type: 'github'
        }).then(function(data) {
          self.githubDone(data.info)
        })
        this.github_loading = true
      },
      githubDone: function(info) {
        this.github_loading = false
        if (info) {
          this.god.github = info
          this.setInfo(info, 'github')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          name: this.god_name,
          type: 'instagram'
        }).then(function(data) {
          self.instagramDone(data.info)
        })
        this.instagram_loading = true
      },
      instagramDone: function(info) {
        this.instagram_loading = false
        if (info) {
          this.god.instagram = info
          this.setInfo(info, 'instagram')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          name: this.god_name,
          type: 'tumblr'
        }).then(function(data) {
          self.tumblrDone(data.info)
        })
        this.tumblr_loading = true
      },
      tumblrDone: function(info) {
        this.tumblr_loading = false
        if (info) {
          this.god.tumblr = info
          this.setInfo(info, 'tumblr')
        }
        let self = this
        this.$store.dispatch('checkSocial', {
          name: this.god_name,
          type: 'facebook'
        }).then(function(data) {
          self.facebookDone(data.info)
        })
        this.facebook_loading = true
      },
      facebookDone: function(info) {
        this.facebook_loading = false
        if (info) {
          this.god.facebook = info
          this.setInfo(info, 'facebook')
        }
        this.allDone()
      },
      allDone: function(info) {
        this.loading = false
        // Object.assign(this.god_info, this.god)
        this.god.followed_at = window.Date.now() // 当前时间做为follow时间,才会排前面
        this.god.followed = 1
        this.$store.commit('UNSHIFT_MY_GOD', {
          cat: this.cat,
          god: this.god
        })
        this.$emit('add_done', this.god)
        this.init()
      },
      setGodInfo: function(god) {
        this.god = god
      },
      setInfo: function(info, type) {
        if (info.avatar) {
          this.now_avatar = info.avatar
        }
        if (info.description) {
          this.now_description = info.description
        }
        this.now_type = type
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .bz 
    position: relative // 让spinner absolute 定位时能在 card 里
    display: inline-block
    width: 20.9rem 
  .spinner
    position: absolute
    // 居中方法1
    // left: 50%; top: 50%;
    // transform: translate(-50%, -50%);
    left: 0; top: 0; right: 0; bottom: 0;
    margin: auto;    /* 有了这个就自动居中了 */

  .icon.social-icon {
    font-size: 2rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.2rem;
    margin-top: -1.2rem;
  }

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
