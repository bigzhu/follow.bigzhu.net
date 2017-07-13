<template>
  <q-card>
    <q-card-media overlay-position="top">
      <img :src="avatar||'/statics/assets/avatar.svg'">
      <q-card-title slot="overlay">
        {{god.name}}
        <span slot="subtitle">{{god.cat}}</span>
      </q-card-title>
    </q-card-media>

    <q-card-main>
      <p v-html="description"></p>
      <GodRemark v-model="remark" :god_id="god.id"></GodRemark>
      <q-field icon="fa-instagram" helper="" error-label="We got an error">
        <q-input v-model="god.instagram.name" :disable="disable_edit" float-label="Instagram" />
      </q-field>
      <q-field icon="fa-twitter" helper="" error-label="We got an error">
        <q-input v-model="god.twitter.name" :disable="disable_edit" float-label="Twitter" />
      </q-field>
      <q-field icon="fa-github" helper="" error-label="We got an error">
        <q-input v-model="god.github.name" :disable="disable_edit" float-label="Github" />
      </q-field>
      <q-field icon="fa-tumblr" helper="" error-label="We got an error">
        <q-input v-model="god.tumblr.name" :disable="disable_edit" float-label="Tumblr" />
      </q-field>
      <q-field icon="fa-facebook" helper="" error-label="We got an error">
        <q-input v-model="god.facebook.name" :disable="disable_edit" float-label="Facebook(不再同步了)" />
      </q-field>
    </q-card-main>

    <q-card-actions align="around">
      <q-btn v-show="disable_edit" @click="save" class="light">
        {{ $t("GodInfo.edit") }}
      </q-btn>
      <q-btn color="secondary" v-show="!disable_edit" @click="save">
        {{ $t("GodInfo.save") }}
      </q-btn>
      <Follow v-model="god.followed" :god_id="god.id"></Follow>
    </q-card-actions>
  </q-card>
</template>

<script>
  import {
    QCardActions,
    QBtn,
    QField,
    QInput,
    QList,
    QCardMain,
    QCard,
    QCardMedia,
    QCardTitle
  } from 'quasar'
  import GodRemark from './GodRemark'
  import Follow from './Follow'
  import god_data from '../datas/god'
  // import default_avatar from '../assets/avatar.svg'
  import GodItemBase from './GodItemBase'
  export default {
    mixins: [GodItemBase],
    components: {
      QCardActions,
      QBtn,
      QField,
      QInput,
      QList,
      QCardMain,
      QCardTitle,
      QCardMedia,
      QCard,
      GodRemark,
      Follow
    },
    directives: {},
    props: {
      god: {
        type: Object,
        default: function() {
          return god_data
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

<style lang="stylus">
  .q-field i
    font-size 1.5rem
</style>
<style lang="stylus" scoped>
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
