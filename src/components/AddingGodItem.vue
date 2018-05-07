<template>
  <q-card class="bz the-hover-bz">
    <q-spinner-puff v-show="loading" name="puff" color="#000000" size="17rem" class="spinner" />
    <q-icon :name="getIcon()" class="social-icon"></q-icon>

    <q-item>
      <router-link :to="{ name: 'God', params: { god_name: god.name }}">
        <q-item-side :avatar="god.avatar||'/statics/assets/avatar.svg'" />
      </router-link>
      <q-item-main>
        <router-link :to="{ name: 'God', params: { god_name: god.name }}">
          <q-item-tile label>{{god.name}}</q-item-tile>
        </router-link>
        <q-item-tile sublabel>
          {{god.followed_count||1}} {{ $t("人关注") }}
        </q-item-tile>
      </q-item-main>
    </q-item>

    <q-card-title>
      <div slot="subtitle">
        <social-badge @click.native="setNow(god.twitter)" v-show="haveSocial('twitter')" type="twitter" :info="god.twitter"/>
        <social-badge @click.native="setNow(god.github)" v-show="haveSocial('github')" type="github" :info="god.github"/>
        <social-badge @click.native="setNow(god.tumblr)" v-show="haveSocial('tumblr')" type="tumblr" :info="god.tumblr"/>
        <social-badge @click.native="setNow(god.instagram)" v-show="haveSocial('instagram')" type="instagram" :info="god.instagram"/>
        <social-badge @click.native="setNow(god.facebook)" v-show="haveSocial('facebook')" type="facebook" :info="god.facebook"/>
      </div>
    </q-card-title>

    <q-card-main class="card-content green-bz">
      <p v-html="bio"></p>
      <GodRemark v-model="god.remark" :god_id="god.id" class="card-content green-bz remark"></GodRemark>
    </q-card-main>
    <q-card-actions align="end">
    </q-card-actions>
  </q-card>
</template>

<script>
  import {
    QIcon,
    QSpinnerPuff
  } from 'quasar'
  import Follow from './Follow'
  import GodItem from './GodItem'
  import SocialBadge from './SocialBadge'

  export default {
    mixins: [GodItem],
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
      QSpinnerPuff,
      SocialBadge,
      Follow
    },
    data: function() {
      return {
        loading: false,
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
      // 是否有这个社交类型
      haveSocial: function (social) {
        return true
      },
      getIcon: function() {
        if (this.twitter_loading) return 'fa-twitter'
        if (this.github_loading) return 'fa-github'
        if (this.instagram_loading) return 'fa-instagram'
        if (this.tumblr_loading) return 'fa-tumblr'
        if (this.facebook_loading) return 'fa-facebook'
        return ''
      },
      init: function() {
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
        this.loading = true
        this.$store.dispatch('postGod', {
          name: this.god_name,
          cat: this.cat
        }).then((god_info) => {
          this.startCheck(god_info)
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
          self.twitterDone(data)
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
          self.githubDone(data)
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
          self.instagramDone(data)
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
          self.tumblrDone(data)
        })
        this.tumblr_loading = true
      },
      tumblrDone: function(info) {
        this.tumblr_loading = false
        if (info) {
          this.god.tumblr = info
          this.setInfo(info, 'tumblr')
        }
        this.allDone()
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
        this.$store.commit('unshift_my_god', {
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
  .q-card
    .q-spinner
      z-index 99 // 让 spinner 不要被遮住
    position: relative // 让spinner absolute 定位时能在 card 里
    display: inline-block
    width: 20.9rem
    min-height: 20.9rem
    @media (max-width: 920px)
      min-width 100%
  .q-item-side img // 改大小
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
