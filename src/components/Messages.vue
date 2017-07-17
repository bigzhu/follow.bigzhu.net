<template>
  <div>
    <Old :god_name="god_name" :show="!(followed_god_count===0 || new_loading)"></Old>
    <NotYetFollow v-show="followed_god_count===0 && is_login"></NotYetFollow>
    <q-slide-transition v-show="!is_login">
      <div v-show="show_no_login" class="no-login">
        <img src="../statics/assets/no-message.svg">
        <p>
          <a href="/login.html">{{ $t("Messages.login") }}</a>{{ $t("Messages.description") }}
        </p>
      </div>
    </q-slide-transition>

    <q-infinite-scroll :offset="1000" :handler="loadMore">
      <message v-for='message in messages' :message='message' :key="message.id">
      </message>
      <SpinnerBz :show="new_loading"></SpinnerBz>
    </q-infinite-scroll>
  </div>
</template>

<script>
  import {
    QSlideTransition,
    QInfiniteScroll
  } from 'quasar'
  import NotYetFollow from './NotYetFollow'
  import SpinnerBz from './SpinnerBz'
  var get_count = 10
  import Old from './Old.vue'
  import Message from './Message.vue'
  import checkLogin from 'bz-lib/functions/checkLogin'
  import toast from '../functions/toast'

  export default {
    components: {
      QSlideTransition,
      QInfiniteScroll,
      NotYetFollow,
      SpinnerBz,
      Old,
      Message
    },
    props: {
      type: {
        type: String, // main god collect search
        default: 'main'
      }
    },
    // watch: {
    //   '$route': 'fetchData'
    // },
    events: {
      'unfollow': function(god_id) { // 监听unfollow事件，移除已经unfollow的god的message
        this.$store.dispatch('removeFromMessages', god_id)
      }
    },
    data: function() {
      return {
        show_no_login: false
      }
    },
    computed: {
      is_login() {
        return checkLogin()
      },
      unread_message_count() {
        return this.$store.state.unread_message_count
      },
      followed_god_count() {
        return this.$store.state.followed_god_count
      },
      god_name() {
        if (this.$route.params.god_name) return this.$route.params.god_name
      },
      new_loading() {
        return this.$store.state.new_loading
      },
      messages() {
        switch (this.type) {
          case 'god':
            {
              return this.$store.state.gods_messages[this.god_name]
            }
          case 'collect':
            {
              return this.$store.state.collect_messages
            }
          default:
            {
              return this.$store.state.messages
            }
        }
      }
    },
    mounted() {
      if (!this.messages || this.messages.length === 0) {
        if (this.type === 'god') {
          this.$store.commit('FILTER_GOD_MESSAGES', this.god_name)
        } else {
          this.loadMessages()
        }
      }
      this.$nextTick(function() {
        this.showNoLogin()
      })
    },
    methods: {
      showNoLogin: function() {
        if (!this.is_login) {
          let self = this
          setTimeout(function() {
            self.show_no_login = true
          }, 1500)
          setTimeout(function() {
            self.show_no_login = false
          }, 5000)
        }
      },
      loadMore: function(index, done) {
        this.loadMessages().then(function() {
          setTimeout(done, 3000)
        })
      },
      loadMessages: function() { // 根据类型, 加载 Message
        switch (this.type) {
          case 'god':
            {
              return this.newGodMessage()
            }
          case 'collect':
            {
              return this.newCollectMessage()
            }
          default:
            {
              return this.newMessage(get_count)
            }
        }
      },
      newCollectMessage: function() {
        return this.$store.dispatch('getCollect')
      },
      newGodMessage: function() {
        return this.$store.dispatch('newMessage', {
          god_name: this.god_name,
          limit: get_count
        })
      },
      newMessage: function(limit = null) {
        let after = null
        if (this.messages.length > 0) {
          after = this.messages[this.messages.length - 1].created_at
          toast('recordLastMessage')
          this.$store.dispatch('recordLastMessage', after)
        }
        return this.$store.dispatch('getNew', {
          after: after,
          limit: limit
        })
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
