<template>
  <q-card class="the-hover-bz">

    <q-dialog v-model="opened" position="left" :content-css="{padding: '0px'}">
      <q-inner-loading :dark="false" :visible="loading">
        <q-spinner-gears size="3rem" color="secondary" />
      </q-inner-loading>
      <GodItem :god="star" :key="star.ID" style="width: 100%" />
    </q-dialog>

    <q-item>
      <q-item-section @click.native="opened=!opened" avatar>
        <q-avatar>
          <img :src="avatar">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <router-link :to="{ name: 'God', params: { starName: star.Name }}">
            {{star.Name}}
          </router-link>
        </q-item-label>
        <q-item-label caption>
          <router-link :to="{ name: 'Recommand', params: { cat: star.Cat||'all' }}" class="stamp">
            {{star.Cat}}
          </router-link>
        </q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption>
          <a target="_blank" :href="href">
            {{message.Social}}
            <q-icon :name="'fab fa-'+message.Social" />
          </a>
        </q-item-label>
        <TimeLen :dateTime="message.OutCreatedAt" :lang="lang" />
      </q-item-section>

    </q-item>

    <q-card class="green-bz">
      <MessageContent class="content-bz" :message="message" />
    </q-card>

    <q-card-actions align="right" class="card-actions bz">
      <router-link :to="{ name:'TheMessage', params: {id:message.ID}}" class="more-infor-bz hover-show-bz">
        <q-icon name="more_horiz" />
      </router-link>
      <a @click="toggleCollect(message)" :class="{'hover-show-bz':!message.Collect}" class="bookmark">
        <q-icon :class="{'bookmark-light': message.Collect}" name="bookmark_border" />
      </a>
      <a @click="anki" :class="{'hover-show-bz':!message.Anki}" class="anki">
        <q-icon :class="{'anki-light': message.Anki}" name="stars" />
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
        return this.$store.state.god.mapStarSocials[this.message.StarID.toString()][this.message.Social]
      },
      star() {
        return this.$store.state.god.mapStars[this.message.StarID.toString()]
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
        return this.message.Href
      },
      avatar: function () {
        return this.starSocial.Avatar
      }
    },
    methods: {
      anki: function () {
        if (this.message.Anki) return
        this.message.Anki = 1
        let front = this.$el.getElementsByClassName('content-bz')[0].innerHTML
        this.$store
          .dispatch('postAnki', {
            front: front,
            messageId: this.message.ID
          })
          .then(function () {}).catch((error) => {
            this.$q.notify(error.response.data)
          })
      },
      toggleCollect: function (message) {
        if (message.Collect) {
          message.Collect = 0
          this.$store.dispatch('uncollect', message.ID)
        } else {
          message.collect = 1
          this.$store.dispatch('collect', message.ID)
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
