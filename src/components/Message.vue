<template>
  <q-card class="the-hover-bz">
    <q-modal v-model="opened" position="left" :content-css="{padding: '0px'}">
      <q-inner-loading :dark="false" :visible="loading">
        <q-spinner-gears size="3rem" color="secondary"></q-spinner-gears>
      </q-inner-loading>
      <GodItem :god="influencer" :key="influencer.id" style="width: 100%" />
    </q-modal>

    <q-item>
      <q-item-side @click.native="opened=!opened" :avatar="avatar" class="bz_avatar">
      </q-item-side>
      <q-item-main>
        <q-item-tile label>
          <router-link :to="{ name: 'God', params: { god_name: influencer.name }}">
            {{influencer.name}}
          </router-link>
        </q-item-tile>
        <q-item-tile sublabel>
          <router-link :to="{ name: 'Recommand', params: { cat: influencer.cat||'all' }}" class="stamp">
            {{influencer.cat}}
          </router-link>
        </q-item-tile>
      </q-item-main>
      <q-item-side>
        <a target="_blank" :href="href">
          <TimeLen :date_time="message.out_created_at" :lang="lang"></TimeLen>
          <q-icon :name="'fab fa-'+message.social" />
        </a>
      </q-item-side>
    </q-item>

    <q-card-main class="green-bz">
      <Twitter class="content-bz" :message="message" />
      <!--
      <component class="content-bz" :is="message.m_type" :message="message"></component>
      -->
    </q-card-main>

    <q-card-actions align="end" class="card-actions bz">
      <router-link :to="{ name:'TheMessage', params: {id:message.id}}" class="more-infor-bz hover-show-bz">
        <q-icon name="more_horiz"></q-icon>
      </router-link>
      <a @click="toggleCollect(message)" :class="{'hover-show-bz':!message.collect}" class="bookmark">
        <q-icon :class="{'bookmark-light': message.collect}" name="bookmark_border"></q-icon>
      </a>
      <a @click="anki" :class="{'hover-show-bz':!message.anki}" class="anki">
        <q-icon :class="{'anki-light': message.anki}" name="stars"></q-icon>
        <!--
        <anki class="anki-bz" :light="message.anki" :anki_color="anki_color"/>
        -->
      </a>
    </q-card-actions>
  </q-card>
</template>

<script>
  import Twitter from './Twitter'
  import Github from './Github'
  import Instagram from './Instagram'
  import Tumblr from './Tumblr'
  import Facebook from './Facebook'
  import TimeLen from '../libs/components/TimeLen'
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
      Facebook,
      Twitter,
      Github,
      Instagram,
      Tumblr
    },
    data: function() {
      return {
        opened: false, // god 信息是否弹出
        anki_color: '#B3B3B3' // #57ADE3
      }
    },
    mounted() {
      this.$nextTick(function() {
        // 给 anki 用
        this.message.el = this.$el
      })
    },
    computed: {
      influencer_social() {
        return this.message.influencer_social
      },
      influencer() {
        return this.influencer_social.influencer
      },
      loading() {
        return this.$store.state.lib.loading
      },
      lang() {
        return Vue.config.lang
      },
      href: function() {
        if (this.message.m_type === 'github') {
          return `https://github.com/${this.message.name}`
        }
        return this.message.href
      },
      avatar: function() {
        return this.influencer_social.avatar
      }
    },
    methods: {
      anki: function() {
        if (this.message.anki) return
        this.message.anki = 1
        let front = this.$el.getElementsByClassName('content-bz')[0].innerHTML
        this.$store
          .dispatch('postAnki', {
            front: front,
            message_id: this.message.id
          })
          .then(function() {
            // self.message.anki = 1
          }).catch((error) => {
            this.$q.notify(error.response.data)
          })
      },
      toggleCollect: function(message) {
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

.item.two-lines > .item-content.bz > .stamp {
  font-size: 12px;
}

.item.two-lines > .item-content.bz {
  margin-left: 3.5rem;
  padding-top: 0.84rem;
  font-size: 1rem;
}
</style>

<style lang="stylus" scoped>
  @media (max-width 991px)
    .q-card-main // 平板不要 padding, 让图片拉到边上
      padding-left 0
      padding-right 0
    .q-card-main >>> .description // 文字内容此时反而要离开边上, 不然顶住不好看
      padding-left 16px
      padding-right 16px
  .q-card
    box-shadow none //不要显示消息边框
    border-bottom 1px solid #eee // 显示一个弱弱的小横线,表示结束
  .q-card-container {
    padding-bottom: 0;
  }
  .modal .q-card {
    margin: 0;
  }
  .q-card {
    overflow-wrap: break-word; // 让 a 换行
  }
  @media (min-width: 767px) {
    .anki-bz { // anki button 对齐
      vertical-align: middle;
      width: 1rem;
      height: 1rem;
    }
    .bookmark:hover {
      color: #FBBD08;
    }
    .anki:hover {
      color: #57ADE3;
    }
  }
  // 为了对齐
  .q-item {
    padding: 16px;
    padding-bottom: 0;
    padding-top: 8px;
  }
  .q-item-side.bz_avatar { // 图标和名字拉近一点
    cursor: pointer; // 变可手, 可点击
    // 头像缩小
    width: 2rem;
    height: 2rem;
    min-width: inherit;
  }
  .more-infor-bz:hover {
    color: #54B98F;
  }
  .anki-light {
    color: #57ADE3;
  }
  .bookmark-light {
    color: #FBBD08;
  }
  i.icon {
    font-size: 1rem;
    vertical-align: baseline;
  }
  /* message margin 要拉开 */
  .q-card {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  /* actions 要有间距 */
  .q-card-actions a {
    padding-left: 0.5rem;
  }
</style>
