<template>
  <div>
    <Old :show="!(followed_god_count===0 || new_loading)"></Old>
    <div v-show="followed_god_count===0 && is_login" class="center-container-bz">
      <img src="../assets/no-message.svg">
      <p>{{ $t("Messages.nofollow") }} <router-link :to="{'name': 'Recommand'}">{{ $t("Messages.whattofollow") }}</router-link>{{ $t("Messages.interesting") }}</p>
    </div>

    <q-transition v-show="!is_login" name="slide">
      <div v-show="show_no_login" class="no-login">
        <img src="../assets/no-message.svg">
        <p>
          <a href="/login.html">{{ $t("Messages.login") }}</a>{{ $t("Messages.description") }}
        </p>
      </div>
    </q-transition>

    <q-infinite-scroll :handler="loadMore">
      <message v-for='message in messages' :message='message' :key="message.id">
      </message>
      <SpinnerBz :show="new_loading"></SpinnerBz>
    </q-infinite-scroll>
    <div v-show="followed_god_count>0 && unread_message_count===0" class="center-container-bz">
      <p>{{ $t("Messages.nomessage") }}
        <router-link :to="{'name': 'Recommand'}">{{ $t("Messages.wanttofollow") }}&gt;</router-link>
      </p> 
    </div>
  </div>
</template>

<script>
  import SpinnerBz from './SpinnerBz'
  var get_count = 50
  import Old from './Old.vue'
  import Message from './Message.vue'
  import checkLogin from 'bz-lib/functions/checkLogin'

  export default {
    components: {
      SpinnerBz,
      Old,
      Message
    },
    watch: {
      '$route': 'fetchData'
    },
    events: {
      'unfollow': function (god_id) { // 监听unfollow事件，移除已经unfollow的god的message
        this.$store.dispatch('removeFromMessages', god_id)
      }
    },
    data: function () {
      return {
        show_no_login: false
      }
    },
    computed: {
      is_login () {
        return checkLogin()
      },
      unread_message_count () {
        return this.$store.state.unread_message_count
      },
      followed_god_count () {
        return this.$store.state.followed_god_count
      },
      god_name () {
        if (this.$route.params.god_name) return this.$route.params.god_name.toLowerCase()
      },
      new_loading () {
        return this.$store.state.new_loading
      },
      messages () {
        if (!this.god_name) return this.$store.state.messages
        return this.$store.state.gods_messages[this.god_name]
      }
    },
    mounted () {
      this.fetchData()
      this.$nextTick(function () {
        this.showNoLogin()
      })
    },
    methods: {
      showNoLogin: function () {
        if (!this.is_login) {
          let self = this
          setTimeout(function () { self.show_no_login = true }, 1500)
          setTimeout(function () { self.show_no_login = false }, 5000)
        }
      },
      checkLogin: checkLogin,
      fetchData: function () {
        if (!this.god_name) {
          if (this.messages.length === 0) {
            // this.newMessage(5)
            this.newMessage(get_count)
          }
        } else {
          this.$store.commit('FILTER_GOD_MESSAGES', this.god_name)
          if (this.messages.length === 0) { // 现成没有，要自已取了
            this.$store.dispatch('getNew', {god_name: this.god_name, limit: 5})
            this.$store.dispatch('getNew', {god_name: this.god_name, limit: get_count})
          }
        }
      },
      loadMore: function (index, done) {
        if (this.messages.length) {
          let created_at = this.messages[this.messages.length - 1].created_at
          this.$store.dispatch('recordLastMessage', created_at)
        }
        this.newMessage(get_count).then(function (data) {
          if (data.messages.length === 0) { // 无数据时避免抖动
            setTimeout(done, 3000)
          } else {
            done()
          }
        })
      },
      newMessage: function (limit = null) {
        let after = null
        if (this.messages.length > 0) {
          after = this.messages[this.messages.length - 1].created_at
        }
        return this.$store.dispatch('getNew', {after: after, limit: limit})
      }
    }
  }
</script>

<style scoped>
  .no-login {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
</style>
