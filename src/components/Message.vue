<template>
  <q-card class="the-hover-bz">
    <q-modal v-model="opened" position="left" :content-css="{padding: '0px'}">
      <q-inner-loading :dark="false" :visible="loading">
        <q-spinner-gears size="3rem" color="secondary" />
      </q-inner-loading>
      <GodItem :god="star" :key="star.id" style="width: 100%" />
    </q-modal>

    <q-item>
      <q-item-side @click.native="opened=!opened" :avatar="avatar" class="bzAvatar">
      </q-item-side>
      <q-item-main>
        <q-item-tile label>
          <router-link :to="{ name: 'God', params: { starName: star.name }}">
            {{star.name}}
          </router-link>
        </q-item-tile>
        <q-item-tile sublabel>
          <router-link :to="{ name: 'Recommand', params: { cat: star.cat||'all' }}" class="stamp">
            {{star.cat}}
          </router-link>
        </q-item-tile>
      </q-item-main>
      <q-item-side>
        <a target="_blank" :href="href">
          <TimeLen :dateTime="message.outCreatedAt" :lang="lang" />
          <q-icon :name="'fab fa-'+message.social" />
        </a>
      </q-item-side>
    </q-item>

    <q-card-main class="green-bz">
      <MessageContent class="content-bz" :message="message" />
    </q-card-main>

    <q-card-actions align="end" class="card-actions bz">
      <router-link :to="{ name:'TheMessage', params: {id:message.id}}" class="more-infor-bz hover-show-bz">
        <q-icon name="moreHoriz" />
      </router-link>
      <a @click="toggleCollect(message)" :class="{'hover-show-bz':!message.collect}" class="bookmark">
        <q-icon :class="{'bookmark-light': message.collect}" name="bookmarkBorder" />
      </a>
      <a @click="anki" :class="{'hover-show-bz':!message.anki}" class="anki">
        <q-icon :class="{'anki-light': message.anki}" name="stars" />
      </a>
    </q-card-actions>
  </q-card>
</template>

<script>
  import MessageContent from './MessageContent'
  import TimeLen from 'bz-q-lib/src/components/TimeLen'
  import Vue from 'vue'
  import Proxy from './Proxy'
  import GodItem from './GodItem'

  export default {
    mixins: [Proxy],
    props: {
      message: {
        type: Object
      }
    },
    components: {
      GodItem,
      TimeLen,
      MessageContent
    },
    data: function () {
      return {
        opened: false, // god 信息是否弹出
        ankiColor: '#B3B3B3' // #57ADE3
      }
    },
    mounted() {
      this.$nextTick(function () {
        // 给 anki 用
        this.message.el = this.$el
      })
    },
    computed: {
      starSocial() {
        return this.$store.state.god.mapStarSocials[this.message.starID.toString()][this.message.social]
      },
      star() {
        return this.$store.state.god.mapStars[this.message.starID.toString()]
      },
      loading() {
        return this.$store.state.lib.loading
      },
      lang() {
        return Vue.config.lang
      },
      href: function () {
        if (this.message.mType === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      avatar: function () {
        return this.starSocial.avatar
      }
    },
    methods: {
      anki: function () {
        if (this.message.anki) return
        this.message.anki = 1
        let front = this.$el.getElementsByClassName('content-bz')[0].innerHTML
        this.$store
          .dispatch('postAnki', {
            front: front,
            messageId: this.message.id
          })
          .then(function () {}).catch((error) => {
            this.$q.notify(error.response.data)
          })
      },
      toggleCollect: function (message) {
        if (message.collect) {
          message.collect = 0
          this.$store.dispatch('uncollect', message.id)
        } else {
          message.collect = 1
          this.$store.dispatch('collect', message.id)
        }
      }
    }
  }
</script>

<style>
  /* 取消原本设定的图片大小 */
  .q-item-avatar {
    width: inherit;
    height: inherit;
  }

  .q-card pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  .q-card code {
    white-space: pre-wrap;
    word-wrap: break-word;
  }

  /* 图片最多也就 100% */
  .q-card img {
    max-width: 100%;
  }

  @media (max-width: 767px) {
    .message-bz {
      box-shadow: rgba(0, 0, 0, 0.03) 0px 0px 0px 1px,
        rgba(0, 0, 0, 0.03) 0px 1px 3px 0px !important;
    }

    .anki-bz svg {
      margin-top: 0.11rem;
    }

    .q-card-actions.bz {
      font-size: 1.3rem;
    }

    .hover-show-bz {
      opacity: 1;
    }

    .anki-bz {
      vertical-align: middle;
      width: 1.3rem;
      height: 1.3rem;
    }
  }

  @media (min-width: 767px) {
    .q-card-actions.bz {
      padding-top: 0;
      padding-bottom: 0.5rem;
      font-size: 1rem;
    }
  }

  .item.two-lines.bz {
    height: 3rem;
  }

  .item.two-lines>.item-content.bz>.stamp {
    font-size: 12px;
  }

  .item.two-lines>.item-content.bz {
    margin-left: 3.5rem;
    padding-top: 0.84rem;
    font-size: 1rem;
  }
</style>
