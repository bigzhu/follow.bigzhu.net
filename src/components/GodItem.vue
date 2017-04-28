<template>
  <div class="card">
    <div class="row">
      <router-link :to="{ name: 'God', params: { god_name: god.name }}" class="width-2of5 desktop-only">
        <img :src="avatar" class="responsive">
      </router-link>

      <div class="width-5of5">
        <div class="item two-lines">
          <img :src="avatar" class="item-primary mobile-only">
          <div class="item-content has-secondary">
            <router-link :to="{ name: 'God', params: { god_name: god.name }}">
              <span class="title">{{god.name}}</span>
            </router-link>
            <br>
            {{god.followed_count}} {{ $t("GodItem.follownumber") }}
          </div>

          <div class="item-secondary stamp">
            <social-badge v-show="god.twitter_user" @show_this="setGodInfo" :info="god.twitter_user"></social-badge>
            <social-badge v-show="god.github_user" @show_this="setGodInfo" :info="god.github_user"></social-badge>
            <social-badge v-show="god.tumblr_user" @show_this="setGodInfo" :info="god.tumblr_user"></social-badge>
            <social-badge v-show="god.instagram_user" @show_this="setGodInfo" :info="god.instagram_user" ></social-badge>
            <social-badge v-show="god.facebook_user" @show_this="setGodInfo" :info="god.facebook_user"></social-badge>
          </div>
        </div>
        <div v-html="description" class="card-content green-bz"></div> 
        <god-remark v-model="remark" :god_id="god.id" class="card-content green-bz"></god-remark>
      </div>
      <Follow v-model="god.followed" :god_id="god.god_id" class="follow"></Follow>
    </div>
  </div>
</template>

<script>
  import Follow from './Follow'
  import GodRemark from './GodRemark'
  import SocialBadge from './SocialBadge'
  import btoa from '../functions/encode_url'
  import myautolinker from '../functions/myautolinker'
  export default {
    props: {
      god: {
      },
      is_my: {
      }
    },
    components: {
      SocialBadge,
      Follow,
      GodRemark
    },
    watch: {
      god_id: function () {
        this.setGodInfo()
      }
    },
    mounted () {
      this.setGodInfo()
    },
    directives: {
    },
    data: function () {
      return {
        loading: false,
        god_info: {
          avatar: '',
          description: ''
        }
      }
    },
    computed: {
      god_id: function () {
        return this.god.god_id
      },
      remark: function () {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      },
      description: function () {
        if (!this.god_info || !this.god_info.description) { return '' }
        return this.god_info.description
      },
      avatar: function () {
        if (!this.god_info || !this.god_info.avatar) {
          return ''
        }
        return '/api_sp/' + btoa(this.god_info.avatar)
      }
    },
    methods: {
      block: function (god) {
        this.loading = true
        let self = this
        this.$store.dispatch('postBlock', god.god_id).then(function (data) {
          self.$store.commit('REMOVE_THIS_GOD_CAT_MY_GODS', god.god_id)
          self.loading = false
        })
        if (god.followed === 1) { self.$store.dispatch('unfollow', god.god_id) }
      },
      setGodInfo: function (type) {
        if (type) {
          this.god_info.avatar = this.god[type + '_user'].avatar
          this.god_info.description = myautolinker(this.god[type + '_user'].description, type)
        } else {
          if (this.god.twitter_user) {
            this.setGodInfo('twitter')
          } else if (this.god.github_user) {
            this.setGodInfo('github')
          } else if (this.god.tumblr_user) {
            this.setGodInfo('tumblr')
          } else if (this.god.instagram_user) {
            this.setGodInfo('instagram')
          } else if (this.god.facebook_user) {
            this.setGodInfo('facebook')
          }
        }
      }
    }
  }
</script>

<style>
  .card:hover .hover-show {
    opacity: 1;
  }
</style>

<style scoped>

  @media (max-width : 920px) { 
    .item.two-lines > .item-secondary.stamp {
      top: 42px;
      left: 1rem;
      right: initial;
    }
  }
  @media (min-width : 921px) { 

    .item > .item-primary ~ .item-content { /* 桌面上不要空头像的位置 */
      margin-left: 16px;
    }

  }

  .follow {
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .title {
    font-size: 1.1rem;
    font-weight: 500;
  }

  .width-2of5 {/* 居中头像 */
    min-height: 17rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .item > .item-secondary.stamp {
    width: auto;
  }
</style>
