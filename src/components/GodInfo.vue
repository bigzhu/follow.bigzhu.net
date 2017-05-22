<template>
  <div class="card">
    <div class="card-title">
      {{god.name}}
    </div>

    <img :src="avatar" class="">
    <div class="card-content">
      <p v-html="description"></p>
      <GodRemark v-model="remark" :god_id="god.id"></GodRemark>
    </div>

    <div class="list">
      <div class="item two-lines">
        <i class="item-primary github icon"></i>
        <div class="item-content">
          <input v-model="god.github.name" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary twitter icon"></i>
        <div class="item-content">
          <input v-model="god.twitter.name" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary instagram icon"></i>
        <div class="item-content">
          <input v-model="god.instagram.name" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary tumblr icon"></i>
        <div class="item-content">
          <input v-model="god.tumblr.name" :disabled="disable_edit" class="full-width">
        </div>
      </div>
      <div class="item two-lines">
        <i class="item-primary facebook icon"></i>
        <div class="item-content">
          <input v-model="god.facebook.name" :disabled="disable_edit" class="full-width">
        </div>
      </div>
    </div>

    <div class="footer">
      <Follow v-model="god.followed" :god_id="god.id"></Follow>
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
  import GodRemark from './GodRemark'
  import Follow from './Follow'
  // import default_avatar from '../assets/avatar.svg'
  import GodItemBase from './GodItemBase'
  export default {
    mixins: [GodItemBase],
    components: {
      GodRemark,
      Follow
    },
    directives: {
    },
    props: {
      god: {
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
            tumblr: '',
            facebook: ''
          }
        },
        required: true
      }
    },
    computed: {
      remark: function () {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      }
    },
    mounted () {
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
      autoInsert: function (key, scheme) {
        if (key === 'blog') {
          scheme = 'http://'
        }
        if (!this.god[key]) {
          this.god[key] = scheme
        }
      },
      save: function () {
        if (this.disable_edit) {
          this.disable_edit = false
        } else {
          this.disable_edit = true
          var god = {
            name: this.god.name,
            twitter: this.god.twitter,
            github: this.god.github,
            instagram: this.god.instagram,
            tumblr: this.god.tumblr,
            facebook: this.god.facebook
            // bio: this.god.bio
            // avatar: this.god.avatar
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
