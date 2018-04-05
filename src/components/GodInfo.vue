<template>
  <q-card class="the-hover-bz">
    <q-card-media overlay-position="top">
      <img :src="avatar||'/statics/assets/avatar.svg'">
      <q-card-title slot="overlay">
        {{god.name}}
        <span slot="subtitle">{{god.cat}}</span>
      </q-card-title>
    </q-card-media>

    <q-card-main>
      <p v-html="description"></p>
      <GodRemark v-model="remark" :godID="god.id" class="green-bz remark"></GodRemark>
      <q-field icon="fab fa-instagram" helper="" error-label="We got an error">
        <q-input v-model="god.instagram.name" :disable="disable_edit" float-label="Instagram" />
      </q-field>
      <q-field icon="fab fa-twitter" helper="" error-label="We got an error">
        <q-input v-model="god.twitter.name" :disable="disable_edit" float-label="Twitter" />
      </q-field>
      <q-field icon="fab fa-github" helper="" error-label="We got an error">
        <q-input v-model="god.github.name" :disable="disable_edit" float-label="Github" />
      </q-field>
      <q-field icon="fab fa-tumblr" helper="" error-label="We got an error">
        <q-input v-model="god.tumblr.name" :disable="disable_edit" float-label="Tumblr" />
      </q-field>
      <q-field icon="fab fa-facebook" helper="" error-label="We got an error">
        <q-input v-model="god.facebook.name" :disable="disable_edit" float-label="Facebook" />
      </q-field>
    </q-card-main>

    <q-card-actions align="around">
      <q-btn v-show="disable_edit" @click="save" class="light">
        {{ $t("编辑") }}
      </q-btn>
      <q-btn color="secondary" v-show="!disable_edit" @click="save">
        {{ $t("保存") }}
      </q-btn>
      <Follow v-model="god.followed" :godID="god.id"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import GodRemark from './GodRemark'
  import Follow from './Follow'
  import godData from '../datas/god'
  // import default_avatar from '../assets/avatar.svg'
  import GodItemBase from './GodItemBase'
  export default {
    mixins: [GodItemBase],
    components: {
      GodRemark,
      Follow
    },
    directives: {},
    props: {
      god: {
        type: Object,
        default: function() {
          return godData
        },
        required: true
      }
    },
    computed: {
      remark: function() {
        if (this.god.remark) {
          return this.god.remark
        }
        return this.god.admin_remark
      }
    },
    mounted() {},
    data: function() {
      return {
        av: '',
        desc: '',
        loading: false,
        disable_edit: true,
        button_text: '修改资料'
      }
    },
    methods: {
      autoInsert: function(key, scheme) {
        if (key === 'blog') {
          scheme = 'http://'
        }
        if (!this.god[key]) {
          this.god[key] = scheme
        }
      },
      save: function() {
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

<style lang="stylus" scoped>
// 图标大小
  .q-field >>> i
    font-size 1.5rem
// 拉开间距
  .q-field
    margin-top 1rem
    margin-bottom 0.5rem
// 编辑按钮会被拉长,这里要设定, 不知为什么
  .q-btn
    margin .5rem

  /*
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
  */
</style>
