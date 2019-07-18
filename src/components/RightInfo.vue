<template>
  <div>
    <!--
    <q-card class="card">
      <div class="info">
        <i class="wechat icon"></i>{{ $t("微信") }}
      </div>
      <img src="../statics/assets/byMe.png" class="qr-bz">
      <div class="info">
        <i class="qq icon"></i>{{ $t("QQ") }}
      </div>
    </q-card>
    -->

    <div class="row">
      <a class="col-6 col-md-4" href="http://bigzhu.lorstone.com/follow%20center%20%E6%98%AF%E4%BB%80%E4%B9%88.html">{{ $t("关于") }}</a>
      <a class="col-6 col-md-4" href="http://bigzhu.lorstone.com/tag/follow.center/index.html">{{ $t("使用教程") }}</a>
      <a class="col-6 col-md-4" href="http://bigzhu.lorstone.com/follow%20center.html">Change Log</a>
    </div>
    <br>
    <div class="row">
      <span class="col col-md-6">{{ $t("注册人数") }}: {{registeredCount}}</span>
      <span class="col col-md-6">© 2019 Follow Center</span>
    </div>
    <br>
    <q-select v-model="lang" :options="langOptions">
    </q-select>
  </div>
</template>

<script>
  import {
    QSelect
  } from 'quasar'
  export default {
    props: [],
    components: {
      QSelect
    },
    computed: {
      lang: {
        get: function () {
          // return this.$i18n.locale
          if (this.$i18n.locale === 'cn') {
            return {
              label: '中文',
              value: 'cn'
            }
          } else {
            return {
              label: 'English',
              value: 'en'
            }
          }
        },
        set: function (v) {
          this.$i18n.locale = v.value
          window.localStorage.setItem('lang', v.value)
        }
      },
      registeredCount() {
        return this.$store.state.user.registeredCount
      }
    },
    data: function () {
      return {
        langOptions: [{
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
    mounted: function () {
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

<style lang="stylus" scoped>
/*
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
      */
</style>
