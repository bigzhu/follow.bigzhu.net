<template>
  <div class="card">
    <div class="card-title">
      {{god_info.name}}
    </div>

    <img :src="avatar" class="">
    <div class="card-content">
      <p v-html="desc"></p>
      <GodRemark v-model="remark" :god_id="god_info.id"></GodRemark>
    </div>

    <div class="list">
      <div class="item two-lines">
        <i class="item-primary github icon"></i>
        <div class="item-content">
          <input v-model="god_info.github" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary twitter icon"></i>
        <div class="item-content">
          <input v-model="god_info.twitter" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary instagram icon"></i>
        <div class="item-content">
          <input v-model="god_info.instagram" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary tumblr icon"></i>
        <div class="item-content">
          <input v-model="god_info.tumblr" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary facebook icon"></i>
        <div class="item-content">
          <input v-model="god_info.facebook" :disabled="disable_edit" class="full-width">
        </div>
      </div>
    </div>

    <div class="footer">
      <Follow v-model="god_info.followed" :god_id="god_info.id"></Follow>
      <button v-show="disable_edit" @click="save" class="light">
        <i class="icon file text"></i>
        {{ $t("GodInfo.edit") }}
      </button>
      <button v-show="!disable_edit" @click="save" class="light">
        <i class="icon save"></i>
        {{ $t("GodInfo.save") }}
      </button>
    </div>
  </div>
</template>

<script>
  import myautolinker from '../functions/myautolinker'
  import GodRemark from './GodRemark'
  import Follow from './Follow'
  export default {
    components: {
      GodRemark,
      Follow
    },
    directives: {
    },
    props: {
      god_info: {
        type: Object,
        default: function () {
          return {
            id: 1,
            name: 'loading',
            avatar: '',
            bio: '',
            github: '',
            twitter: '',
            instagram: '',
            tumblr: ''
          }
        },
        required: true
      }
    },
    computed: {
      remark: function () {
        if (this.god_info.remark) {
          return this.god_info.remark
        }
        return this.god_info.admin_remark
      },
      avatar: function () {
        if (this.god_info.avatar === '') {
          return '/static/assets/avatar.svg'
        }
        return (window.bz_url || '') + '/api_sp/' + window.btoa(window.btoa(this.av))
      }
    },
    mounted () {
      this.setGodInfo()
    },
    watch: {
      'god_info': {
        handler: function (val, oldVal) { this.setGodInfo() },
        deep: true
      }
    },
    data: function () {
      return {
        av: '',
        desc: '',
        loading: false,
        disable_edit: true,
        button_text: '修改资料'
      }
    },
    methods: {
      setGodInfo: function (type) {
        if (type) {
          this.av = this.god_info[type + '_user'].avatar
          // this.desc = this.god_info[type + '_user'].description
          this.desc = myautolinker(this.god_info[type + '_user'].description, type)
        } else {
          if (this.god_info.twitter_user) {
            this.setGodInfo('twitter')
          } else if (this.god_info.github_user) {
            this.setGodInfo('github')
          } else if (this.god_info.tumblr_user) {
            this.setGodInfo('tumblr')
          } else if (this.god_info.instagram_user) {
            this.setGodInfo('instagram')
          } else if (this.god_info.facebook_user) {
            this.setGodInfo('facebook')
          } else {
            this.av = ''
            this.desc = ''
          }
        }
      },
      autoInsert: function (key, scheme) {
        if (key === 'blog') {
          scheme = 'http://'
        }
        if (!this.god_info[key]) {
          this.god_info[key] = scheme
        }
      },
      save: function () {
        if (this.disable_edit) {
          this.disable_edit = false
        } else {
          this.disable_edit = true
          var god = {
            name: this.god_info.name,
            twitter: this.god_info.twitter,
            github: this.god_info.github,
            instagram: this.god_info.instagram,
            tumblr: this.god_info.tumblr,
            facebook: this.god_info.facebook
            // bio: this.god_info.bio
            // avatar: this.god_info.avatar
          }
          this.$store.dispatch('putGod', god)
        }
      }
    }
  }
</script>

<style scoped>
  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .card > img {
    width: 20rem;
  }
  .card .list {
    width: 100%;
    border-top: initial;
    border-bottom: initial;
  }
  .list {
    box-shadow: initial;
  }
  .item.two-lines {
    height: 4rem;
  }
  input:not(.no-style):focus {
    border-bottom: .5px solid #494949;
  }
  input:not(.no-style):hover {
    border-bottom: .5px solid #494949;
  }
  input:not(.no-style) {
    border-bottom: .5px solid #eee;
  }
  .list.highlight .item:hover {
    background-color: initial;
  }
  .button {
    margin: 1rem;
  }
</style>
