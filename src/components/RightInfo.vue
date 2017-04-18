<template>
  <div>
    <div class="card">
      <info>
        <i class="wechat icon"></i>{{ $t("RightInfo.wechat") }}
      </info>
      <img src="../assets/by_me.png" class="qr-bz">
      <info>
        <i class="qq icon"></i>{{ $t("RightInfo.qq") }}
      </info>
    </div>
    <div v-show="registered_count !== -1" class="footer-content">
      <a class="footer-element" href="/about.html">{{ $t("RightInfo.about") }}</a>
      <a class="footer-element" href="http://bigzhu.lorstone.com">{{ $t("RightInfo.blog") }}</a>
      <router-link class="footer-element" :to="{ name: 'ChangeLog'}">{{ $t("RightInfo.changelog") }}</router-link>
      <div class="ui selection dropdown language">
        <input type="hidden">
        <i class="dropdown icon"></i>
        <div class="default text">{{whichLang()}}</div>
        <div class="menu">
          <div class="item" @click="lang='en'" data-value="1">English</div>
          <div class="item" @click="lang='cn'" data-value="0">中文</div>
        </div>
      </div>
    </div>
    <div class="footer-content">
      <span class="footer-element">{{ $t("RightInfo.register") }}：{{registered_count}}</span>
      <span>© 2017 Follow Center</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    props: [],
    components: {
    },
    computed: {
      lang: {
        get: function () {
          return Vue.config.lang
        },
        set: function (v) {
          Vue.config.lang = v
          window.localStorage.setItem('lang', v)
        }
      },
      registered_count () {
        return this.$store.state.registered_count
      }
    },
    data: function () {
      return {
      }
    },
    mounted: function () {
      this.$store.dispatch('getRegisteredCount')
      this.$nextTick(function () {
        // $(this.$el).find('.ui.dropdown').dropdown()
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      whichLang: function () {
        if (this.lang === 'cn') return '中文'
        if (this.lang === 'en') return 'English'
      },
      setLang: function (lang) {
        window.localStorage.setItem('lang', lang)
      }
    }
  }
</script>

<style scoped>
  i {
    vertical-align:top;
  }
  info {
    margin: 1rem;
  }
  .card {
    background: #FFF;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
  .card  img {
    width: 10rem;
  }
</style>
