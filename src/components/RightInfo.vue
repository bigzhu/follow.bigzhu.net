<template>
  <div>
    <!--
    <q-card class="card">
      <div class="info">
        <i class="wechat icon"></i>{{ $t("微信") }}
      </div>
      <img src="../statics/assets/by_me.png" class="qr-bz">
      <div class="info">
        <i class="qq icon"></i>{{ $t("QQ") }}
      </div>
    </q-card>
    -->

    <div class="info">
      <div class="about">
        <a class="footer-element" href="http://bigzhu.lorstone.com/follow%20center%20%E6%98%AF%E4%BB%80%E4%B9%88.html">{{ $t("关于") }}</a>
        <a class="footer-element" href="http://bigzhu.lorstone.com/tag/follow.center/index.html">{{ $t("使用教程") }}</a>
        <a class="footer-element" href="http://bigzhu.lorstone.com/follow%20center.html">Change Log</a>
      </div>

      <div class="footer">
        <span class="footer-element">{{ $t("注册人数") }}: {{registered_count}}</span>
        <span>© 2017 Follow Center</span>
      </div>
      <q-select type="list" v-model="lang" :options="lang_options">
      </q-select>
    </div>
  </div>
</template>

<script>
  import {
    QCard,
    QSelect
  } from 'quasar'
  export default {
    props: [],
    components: {
      QCard,
      QSelect
    },
    computed: {
      lang: {
        get: function() {
          return this.$i18n.locale
        },
        set: function(v) {
          this.$i18n.locale = v
          window.localStorage.setItem('lang', v)
        }
      },
      registered_count() {
        return this.$store.state.user.registered_count
      }
    },
    data: function() {
      return {
        lang_options: [{
            label: 'English',
            value: 'en'
          },
          {
            label: '中文',
            value: 'cn'
          }
        ]
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        // $(this.$el).find('.ui.dropdown').dropdown()
        // code that assumes this.$el is in-document
      })
    },
    methods: {
      whichLang: function() {
        if (this.lang === 'cn') return '中文'
        if (this.lang === 'en') return 'English'
      },
      setLang: function(lang) {
        window.localStorage.setItem('lang', lang)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 微信框那里不要显示边框
  .q-card
    box-shadow none

  .info
    margin 1rem
  .footer
    padding 1rem 0
    border-top 1px solid #eee
    display flex
    & > *
      flex 1
  .q-picker-textfield
    &.textfield
      border-bottom none
      &:focus
        border-bottom none
      &:hover
        border-bottom none
  .q-popover
    list[style]
      min-width initial
  .about
    margin-top 3rem
    padding 1rem 0
    border-top 1px solid #eee
    display flex
    & > *
      flex 1
  i
    vertical-align top
  .card
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    img
      width 10rem
</style>
