<template>
  <div>
    <Old :starName="starName" :show="!(followingGodCount===0)"></Old>
    <NotYetFollow v-show="followingGodCount===0 && isLogin"></NotYetFollow>
    <q-slide-transition v-show="!isLogin">
      <div v-show="showNoLogin" class="no-login">
        <img src="../statics/assets/no-message.svg">
        <p>
          <a href="/login.html">{{ $t("登录") }}</a>{{ $t("登录后能看到更广阔的世界哟!") }}
        </p>
      </div>
    </q-slide-transition>

    <q-infinite-scroll v-scroll="onScroll" :offset="2000" :handler="loadMore" :style="`padding-top:${paddingTop}px;`">
      <message ref="messages" v-for='message in noTypesMessages' :message='message' :key="message.id">
      </message>
      <div v-show="followingGodCount>0 && unreadMessageCount===0 && type==='main'" class="center-container-bz">
        <p>{{ $t("没有更多内容了, 看看") }}
          <router-link :to="{'name': 'Recommand'}">{{ $t("寻他") }}&gt;</router-link>
        </p>
      </div>
      <SpinnerBz :show="newLoading"></SpinnerBz>
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
  import checkLogin from 'bz-q-lib/src/functions/checkLogin'
  import isInList from 'bz-q-lib/src/functions/isInList'
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
    events: {
      'unfollow': function (godID) { // 监听unfollow事件，移除已经unfollow的god的message
        this.$store.dispatch('removeFromMessages', godID)
      }
    },
    data: function () {
      return {
        position: 0, // 用来判断是往上滚动还是往下滚
        showNoLogin: false
      }
    },
    computed: {
      paddingTop() {
        if (this.type === 'main') return this.$store.state.main.hideParams.paddingTop
        else return 0
      },
      isLogin() {
        return checkLogin()
        // return this.$store.state.p.oauthInfo.name
      },
      unreadMessageCount() {
        return this.$store.state.unreadMessageCount
      },
      followingGodCount() {
        return this.$store.state.followingGodCount
      },
      starName() {
        if (this.$route.params.starName) return this.$route.params.starName
        return ''
      },
      newLoading() {
        return this.$store.state.message.newLoading
      },
      oldLoading() {
        return this.$store.state.oldLoading
      },
      hideMessages() {
        return this.messages.filter(function (d) {
          return d.topHide
        })
      },
      showMessages() {
        return this.messages.filter(function (d) {
          return !d.topHide
        })
      },
      noTypesMessages() {
        return this.showMessages.filter((d) => {
          return !isInList(d.mType, this.noTypes)
        })
      },
      messages() {
        switch (this.type) {
        case 'god':
          {
            return this.$store.state.message.godsMessages[this.starName] || []
          }
        case 'collect':
          {
            return this.$store.state.message.collectMessages
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
      // this.$store.dispatch('getStarSocials').then(()=> {
      //  this.$store.dispatch('getStars')
      // })
      this.initLoadMessages()
      this.$nextTick(function () {
        this.showNoLogin()
      })
    },
    methods: {
      initLoadMessages: function () {
        if (!this.messages || this.messages.length === 0) {
          if (this.type === 'god') {
            this.$store.commit('filterGodMessages', this.starName)
            if (this.messages.length === 0) { // 没有过滤值时
              this.$store.dispatch('oldMessage', {
                starName: this.starName
              })
            }
          } else {
            this.loadMessages()
          }
        }
      },
      onScroll: function (position) {
        if (this.$q.platform.is.desktop || this.type !== 'main') return // 桌面不用考虑性能
        let hideP = this.$store.state.main.hideParams
        let overTop = position - 500
        if (overTop > hideP.paddingTop) {
          let message = this.noTypesMessages[0]
          if (!message) return
          let messageHeight = message.el.offsetHeight
          if (overTop - hideP.paddingTop < messageHeight) return
          this.$set(message, 'topHide', true)
          this.$set(message, 'height', messageHeight)
          hideP.paddingTop += messageHeight
          console.log('hide message')
        } else {
          while (overTop < hideP.paddingTop) {
            if (hideP.paddingTop === 0) return
            if (this.hideMessages.length === 0) return
            let message = this.hideMessages[this.hideMessages.length - 1]
            if (hideP.paddingTop - overTop < message.height) return
            hideP.paddingTop -= message.height
            message.topHide = false
            // console.log('show message')
          }
        }
      },
      showNoLogin: function () {
        if (!this.isLogin) {
          let self = this
          setTimeout(function () {
            self.showNoLogin = true
          }, 1500)
          setTimeout(function () {
            self.showNoLogin = false
          }, 5000)
        }
      },
      loadMore: function (index, done) {
        if (this.oldLoading) {
          done()
          return
        }
        this.loadMessages().then(function () {
          setTimeout(done, 3000)
        })
      },
      loadMessages: function () { // 根据类型, 加载 Message
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
      newCollectMessage: function () {
        return this.$store.dispatch('getCollect')
      },
      newGodMessage: function () {
        return this.$store.dispatch('newMessage', {
          starName: this.starName,
          limit: getCount
        })
      },
      newMessage: function (limit = null) {
        let after = null
        if (this.messages.length > 0) {
          after = this.messages[this.messages.length - 1].outCreatedAt
          // this.$store.dispatch('recordLastMessage', after)
        }
        return this.$store.dispatch('getNew', {
          after: after
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
