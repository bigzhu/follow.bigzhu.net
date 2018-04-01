<template>
  <div>
    <Old :god_name="god_name" :show="!(followed_god_count===0)"></Old>
    <NotYetFollow v-show="followed_god_count===0 && is_login"></NotYetFollow>
    <q-slide-transition v-show="!is_login">
      <div v-show="show_no_login" class="no-login">
        <img src="../statics/assets/no-message.svg">
        <p>
          <a href="/login.html">{{ $t("登录") }}</a>{{ $t("登录后能看到更广阔的世界哟!") }}
        </p>
      </div>
    </q-slide-transition>

    <q-infinite-scroll v-scroll="onScroll" :offset="2000" :handler="loadMore" :style="`padding-top:${paddingTop}px;`">
      <message ref="messages" v-for='message in noTypes_messages' :message='message' :key="message.id">
      </message>
      <div v-show="followed_god_count>0 && unread_message_count===0 && type==='main'" class="center-container-bz">
        <p>{{ $t("没有更多内容了, 看看") }}
          <router-link :to="{'name': 'Recommand'}">{{ $t("寻他") }}&gt;</router-link>
        </p>
      </div>
      <SpinnerBz :show="new_loading"></SpinnerBz>
    </q-infinite-scroll>
  </div>
</template>

<script>
  import {
    Scroll,
    QSlideTransition,
    QInfiniteScroll
  } from 'quasar'
  import NotYetFollow from './NotYetFollow'
  import SpinnerBz from './SpinnerBz'
  var getCount = 10
  import Old from './Old.vue'
  import Message from './Message.vue'
  import checkLogin from '../libs/functions/checkLogin'
  import isInList from '../libs/functions/isInList'
  // import toast from '../libs/functions/toast'

  export default {
    directives: {
      Scroll
    },
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
      'unfollow': function(godID) { // 监听unfollow事件，移除已经unfollow的god的message
        this.$store.dispatch('removeFromMessages', godID)
      }
    },
    data: function() {
      return {
        position: 0, // 用来判断是往上滚动还是往下滚
        show_no_login: false
      }
    },
    computed: {
      paddingTop() {
        if (this.type === 'main') return this.$store.state.main.hideParams.paddingTop
        else return 0
      },
      is_login() {
        return checkLogin()
        // return this.$store.state.p.oauth_info.name
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
      old_loading() {
        return this.$store.state.old_loading
      },
      hide_messages() {
        return this.messages.filter(function(d) {
          return d.top_hide
        })
      },
      show_messages() {
        return this.messages.filter(function(d) {
          return !d.top_hide
        })
      },
      noTypes_messages() {
        return this.show_messages.filter((d) => {
          return !isInList(d.m_type, this.noTypes)
        })
      },
      messages() {
        switch (this.type) {
          case 'god':
            {
              return this.$store.state.message.gods_messages[this.god_name] || []
            }
          case 'collect':
            {
              return this.$store.state.message.collect_messages
            }
          default:
            {
              return this.$store.state.message.messages
            }
        }
      },
      noTypes() {
        return this.$store.state.user.noTypes
      }
    },
    mounted() {
      if (!this.messages || this.messages.length === 0) {
        if (this.type === 'god') {
          this.$store.commit('FILTER_GOD_MESSAGES', this.god_name)
          if (this.messages.length === 0) { // 没有过滤值时
            this.$store.dispatch('oldMessage', {
              god_name: this.god_name,
              limit: 10
            })
          }
        } else {
          this.loadMessages()
        }
      }
      this.$nextTick(function() {
        this.showNoLogin()
      })
    },
    methods: {
      onScroll: function(position) {
        if (this.$q.platform.is.desktop || this.type !== 'main') return // 桌面不用考虑性能

        let hideP = this.$store.state.main.hideParams
        let overTop = position - 500
        if (overTop > hideP.paddingTop) {
          let message = this.noTypes_messages[0]
          if (!message) return

          let messageHeight = message.el.offsetHeight

          if (overTop - hideP.paddingTop < messageHeight) return

          this.$set(message, 'top_hide', true)
          this.$set(message, 'height', messageHeight)
          hideP.paddingTop += messageHeight
          console.log('hide message')
        } else {
          while (overTop < hideP.paddingTop) {
            if (hideP.paddingTop === 0) return
            if (this.hide_messages.length === 0) return

            let message = this.hide_messages[this.hide_messages.length - 1]

            if (hideP.paddingTop - overTop < message.height) return

            hideP.paddingTop -= message.height
            message.top_hide = false
            // console.log('show message')
          }
        }
      },
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
        if (this.old_loading) {
          done()
          return
        }
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
              return this.newMessage(getCount)
            }
        }
      },
      newCollectMessage: function() {
        return this.$store.dispatch('getCollect')
      },
      newGodMessage: function() {
        return this.$store.dispatch('newMessage', {
          god_name: this.god_name,
          limit: getCount
        })
      },
      newMessage: function(limit = null) {
        let after = null
        if (this.messages.length > 0) {
          after = this.messages[this.messages.length - 1].out_created_at
          // toast('recordLastMessage')
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
