<template>
  <div class="card">
    <!-- loading -->
    <spinner
      v-show="loading"
      name="puff"
      color="#000000"
      size="17rem"
      class="spinner"
      >
    </spinner>
    <i :class="{'twitter': twitter_loading, 'github': github_loading, 'instagram': instagram_loading, 'tumblr': tumblr_loading, 'facebook': facebook_loading}" class="icon social-icon"></i>

    <div class="row sm-column">
      <router-link :to="{ name: 'God', params: { god_name: god.name }}" class="width-2of5">
        <img :src="avatar" class="responsive">
      </router-link>

      <div class="width-5of5">
        <div class="item two-lines">
          <div class="item-content has-secondary">
            <router-link :to="{ name: 'God', params: { god_name: god.name }}">
              <span class="title">{{god.name}}</span>
            </router-link>
          </div>

          <div class="item-secondary stamp">
            <social-badge v-show="god.twitter_user" @show_this="setGodInfo" :info="god.twitter_user"></social-badge>
            <social-badge v-show="god.github_user" @show_this="setGodInfo" :info="god.github_user"></social-badge>
            <social-badge v-show="god.tumblr_user" @show_this="setGodInfo" :info="god.tumblr_user"></social-badge>
            <social-badge v-show="god.instagram_user" @show_this="setGodInfo" :info="god.instagram_user" ></social-badge>
            <social-badge v-show="god.facebook_user" @show_this="setGodInfo" :info="god.facebook_user"></social-badge>
          </div>
          <div v-html="description" class="card-content green-bz">
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import CountUp from 'bz-count-up'
  import Follow from './Follow'
  import SocialBadge from './SocialBadge'

  export default {
    props: ['god_name'],
    watch: {
      'god_name': function () {
        if (this.god_name === '') {
          return
        }
        this.god.name = this.god_name
        this.getGodInfo()
      }
    },
    components: {
      SocialBadge,
      CountUp,
      Follow
    },
    data: function () {
      return {
        god: {
          name: ''
        },
        avatar: '',
        description: '',
        loading: false,
        twitter_loading: false,
        github_loading: false,
        instagram_loading: false,
        tumblr_loading: false,
        facebook_loading: false
      }
    },
    computed: {
      cat: function () {
        return this.$route.params.cat
      }
    },
    mounted () {
    },
    methods: {
      showAddGodInput: function () {
        this.input_name = '' // 清空上次的输入
        this.$nextTick(
          function () {
            $('#id_add_god').focus()
          }
        )
        // 这时要重新取一下god，以处理连续添加的情况
        // 先不取了，连续添加很少见
        // this.queryNotMyGods(this.$route.params.cat)
      },
      init: function () {
        this.twitter_info = {
          type: 'twitter',
          count: -4
        }
        this.github_info = {
          type: 'github',
          count: -4
        }
        this.tumblr_info = {
          type: 'tumblr',
          count: -4
        }
        this.instagram_info = {
          type: 'instagram',
          count: -4
        }
        this.facebook_info = {
          type: 'facebook',
          count: -4
        }
        this.adding = false
        this.description = ''
        this.avatar = ''
        this.twitter_loading = false
        this.github_loading = false
        this.instagram_loading = false
        this.tumblr_loading = false
        this.facebook_loading = false
      },
      getGodInfo: function () {
        // this.init()
        // this.god_name = this.input_name.trim()
        let self = this
        this.loading = true
        this.$store.dispatch('postGod', {name: this.god_name, cat: this.$route.params.cat}).then(function (data) {
          self.startCheck(data.god_info)
        })
      },
      startCheck: function (god_info) {
        this.setGodInfo(god_info)
        this.adding = false
        this.twitter_loading = true
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'twitter' }).then(function (data) {
          self.twitterDone(data.info)
        })
      },
      twitterDone: function (info) {
        this.twitter_loading = false
        if (info) {
          this.god.twitter_user = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'github' }).then(function (data) {
          self.githubDone(data.info)
        })
        this.github_loading = true
      },
      githubDone: function (info) {
        this.github_loading = false
        if (info) {
          this.god.github_user = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'instagram' }).then(function (data) {
          self.instagramDone(data.info)
        })
        this.instagram_loading = true
      },
      instagramDone: function (info) {
        this.instagram_loading = false
        if (info) {
          this.god.instagram_user = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'tumblr' }).then(function (data) {
          self.tumblrDone(data.info)
        })
        this.tumblr_loading = true
      },
      tumblrDone: function (info) {
        this.tumblr_loading = false
        if (info) {
          this.god.tumblr_user = info
          this.setInfo(info)
        }
        let self = this
        this.$store.dispatch('checkSocial', { name: this.god_name, type: 'facebook' }).then(function (data) {
          self.facebookDone(data.info)
        })
        this.facebook_loading = true
      },
      facebookDone: function (info) {
        this.facebook_loading = false
        if (info) {
          this.god.facebook_user = info
          this.setInfo(info)
        }
        this.allDone()
      },
      allDone: function (info) {
        this.loading = false
        // this.createGod()
        this.god.followed_at = window.Date.now() // 当前时间做为follow时间,才会排前面
        this.$store.commit('UNSHIFT_MY_GOD', {cat: this.cat, god: this.god})
        // this.$store.dispatch('queryCat')
        console.log('emit')
        this.$emit('add_done', this.god_info)
      },
      setGodSocial: function (type) {
        if (this[type + '_info'].count !== -4) {
          this.god_info[type] = this.god_name
          this.god_info[type + '_user'] = this[type + '_info']
        }
      },
      createGod: function () {
        this.setGodSocial('twitter')
        this.setGodSocial('github')
        this.setGodSocial('tumblr')
        this.setGodSocial('instagram')
        this.setGodSocial('facebook')
        this.god_info.followed_at = window.Date.now() // 当前时间做为follow时间,才会排前面
      },
      setGodInfo: function (god_info) {
        this.god_info = god_info
      },
      setInfo: function (info) {
        if (info.avatar) {
          this.avatar = '/api_sp/' + window.btoa(window.btoa(info.avatar))
        }
        if (info.description) {
          this.description = info.description
        }
      }
    }
  }
</script>

<style>
  .icon.social-icon {
    font-size: 2rem;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-1.2rem;
    margin-top:-1.2rem;
  }
  .spinner {
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-8.5rem;
    margin-top:-8.5rem;
  }

  .title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .width-2of5 {/* 居中头像 */
    height: 17rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item > .item-secondary.stamp {
    width: auto;
  }
</style>
