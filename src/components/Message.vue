<template>
  <q-card class="card bz">
    <q-item>
      <q-item-side :avatar="proxy(avatar)" />
      <q-item-main>
        <q-item-tile label>{{message.name}}</q-item-tile>
        <q-item-tile sublabel>{{message.cat}}</q-item-tile>
      </q-item-main>
    </q-item>

    <q-card-main class="card-content green-bz">
      <component class="content-bz" :is="message.m_type" :message="message"></component>
    </q-card-main>

    <q-card-actions align="end" class="card-actions bz">
      <router-link :to="{ name:'TheMessage', params: {id:message.id}}" class="more-infor-bz hover-show">
        <q-icon name="more_horiz"></q-icon>
      </router-link>
      <a @click="toggleCollect(message)" :class="{'hover-show':!message.collect}" class="bookmark">
        <q-icon :class="{'bookmark-light': message.collect}" name="bookmark_border"></q-icon>
      </a>
      <a @mouseleave="anki_color='#767676'" @mousemove="anki_color='#57ADE3'" @click="anki" :class="{'hover-show':!message.anki}">
        <svg class="anki-bz" viewBox="51 -272 19 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <!-- Generator: Sketch 41.2 (35397) - http://www.bohemiancoding.com/sketch -->
          <desc>Created with Sketch.</desc>
          <defs>
            <rect id="path-1" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
            <mask id="mask-2" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
              <use xlink:href="#path-1"></use>
            </mask>
            <linearGradient x1="72.5086929%" y1="34.3563028%" x2="26.5472291%" y2="92.8578943%" id="linearGradient-3">
              <stop stop-color="#228AD7" offset="0%"></stop>
              <stop stop-color="#C8E3F5" offset="100%"></stop>
            </linearGradient>
            <rect id="path-4" x="0" y="1.2" width="13.9658778" height="14.8427295" rx="3"></rect>
            <mask id="mask-5" maskContentUnits="userSpaceOnUse" maskUnits="objectBoundingBox" x="0" y="0" width="13.9658778" height="14.8427295" fill="white">
              <use xlink:href="#path-4"></use>
            </mask>
          </defs>
          <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
            <use id="Rectangle" stroke="#979797" mask="url(#mask-2)" stroke-width="2" xlink:href="#path-1"></use>
            <path d="" id="Path-2" stroke="#979797"></path>
            <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" fill="url(#linearGradient-3)" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729"></polygon>
          </g>
          <g id="Group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" transform="translate(51.000000, -271.000000)">
            <use id="Rectangle" stroke="#767676" mask="url(#mask-5)" stroke-width="2" xlink:href="#path-4"></use>
            <path d="" id="Path-2" stroke="#979797"></path>
            <polygon id="Star" stroke="#FFFFFF" stroke-linejoin="round" :fill="[message.anki ? '#57ADE3' : anki_color]" transform="translate(9.443919, 8.686132) rotate(-19.000000) translate(-9.443919, -8.686132) " points="10.1944045 13.250996 5.68678266 15.6198299 6.54766183 10.6025592 2.90091916 7.04930835 7.94059358 6.31729842 10.1944045 1.75243473 12.4482154 6.31729842 15.9869193 6.8312932 15.2923397 8.8476788 13.8411472 10.6025592 14.1132779 12.1885583 13.1788476 14.8193729">
            </polygon>
          </g>
        </svg>
      </a>
    </q-card-actions>
  </q-card>
</template>

<script>
  import {
    QIcon,
    QItemTile,
    QItemSide,
    QItemMain,
    QItem,
    QCard,
    QCardMain,
    QCardActions,
    QCardTitle
  } from 'quasar'
  import checkLogin from 'bz-lib/functions/checkLogin'
  import GodCard from './GodCard'
  import Twitter from './Twitter'
  import Github from './Github'
  import Instagram from './Instagram'
  import Tumblr from './Tumblr'
  import Facebook from './Facebook'
  import TimeLen from 'bz-time-len'
  import Vue from 'vue'
  import Proxy from './Proxy'

  export default {
    mixins: [Proxy],
    props: {
      message: {
        type: Object,
        default: function() {
          return {
            avatar: '',
            user_name: '',
            id: 0
          }
        }
      }
    },
    components: {
      QIcon,
      QItemTile,
      QItemMain,
      QItemSide,
      QItem,
      QCardTitle,
      QCardActions,
      QCardMain,
      QCard,
      TimeLen,
      Facebook,
      GodCard,
      Twitter,
      Github,
      Instagram,
      Tumblr
    },
    directives: {},
    data: function() {
      return {
        collected: false,
        anki_color: '#B3B3B3' // #57ADE3
      }
    },
    mounted() {
      this.$nextTick(function() {})
    },
    computed: {
      lang() {
        return Vue.config.lang
      },
      is_login() {
        return checkLogin()
      },
      href: function() {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      god_info: function() {
        let god_info = this.$store.state.god_infos[this.message.user_name]
        if (god_info) {
          return god_info
        }
        return {
          god_id: 0
        }
      },
      avatar: function() {
        return this.message.avatar
      }
    },
    methods: {
      anki: function() {
        if (this.message.anki) return
        this.message.anki = 1
        // let front = $(this.$el).find('.content-bz').html()
        let front = this.$el.getElementsByClassName('content-bz')[0].innerHTML
        this.$store.dispatch('postAnki', {
          front: front,
          message_id: this.message.id
        }).then(function() {
          // self.message.anki = 1
        })
      },
      toggleCollect: function(message) {
        if (message.collect) {
          this.$store.dispatch('uncollect', message.id).then(function(data) {
            message.collect = null
          })
        } else {
          this.$store.dispatch('collect', message.id).then(function(data) {
            message.collect = 1
          })
        }
      },
      getGodInfo: function() {
        this.$store.dispatch('getGod', {
          god_name: this.message.user_name,
          loading: false
        })
      },
      collectDone: function(message) {
        message.collect = 1
      },
      uncollectDone: function(message) {
        message.collect = null
      }
    }
  }
</script>

<style>
  .card pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .card code {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .card img {
    max-width: 100%;
  }

  .card-content.green-bz a {
    color: #2ea974;
  }

  @media (max-width: 767px) {
    .message-bz {
      box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 0px 1px, rgba(0, 0, 0, 0.03) 0px 1px 3px 0px !important;
    }
    .anki-bz svg {
      margin-top: 0.11rem;
    }
  }

  .card-actions.bz {
    padding-top: 0;
    padding-bottom: .5rem;
    font-size: 1rem;
  }

  .item.two-lines.bz {
    height: 3rem;
  }

  .item.two-lines>.item-content.bz>.stamp {
    font-size: 12px;
  }

  .item.two-lines>.item-content.bz {
    margin-left: 3.5rem;
    padding-top: .84rem;
    font-size: 1rem;
  }

  .item.two-lines>img.item-primary.bz {
    top: 1rem;
    left: 1rem;
    width: 2rem;
    height: 2rem;
  }

  .item>.item-secondary.stamp.long-bz {
    width: 6rem;
  }
</style>

<style scoped>
  .more-infor-bz:hover {
    color: #54B98F;
  }

  .bookmark:hover {
    color: #FBBD08;
  }

  .bookmark-light {
    color: #FBBD08;
  }

  .anki-bz {
    vertical-align: middle;
    width: 1rem;
    height: 21px;
  }

  i.icon {
    font-size: 1rem;
    vertical-align: baseline;
  }
</style>
