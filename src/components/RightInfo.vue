<template>
  <div>
    <q-card class="card">
      <div class="info">
        <i class="wechat icon"></i>{{ $t("RightInfo.wechat") }}
      </div>
      <img src="../statics/assets/by_me.png" class="qr-bz">
      <div class="info">
        <i class="qq icon"></i>{{ $t("RightInfo.qq") }}
      </div>
    </q-card>

    <div class="info">
    <div class="about">
      <a class="footer-element" href="/about.html">{{ $t("RightInfo.about") }}</a>
      <a class="footer-element" href="http://bigzhu.lorstone.com">{{ $t("RightInfo.blog") }}</a>
      <router-link class="footer-element" :to="{ name: 'ChangeLog'}">{{ $t("RightInfo.changelog") }}</router-link>
    </div>

    <div class="footer">
      <span class="footer-element">{{ $t("RightInfo.register") }}: {{registered_count}}</span>
      <span>© 2017 Follow Center</span>
    </div>
    <q-select type="list" v-model="lang" :options="lang_options" class="select">
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
        return this.$store.state.registered_count
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
      this.$store.dispatch('getRegisteredCount')
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

<style scoped>
  .info {
    margin: 1rem;
  }

  .footer {
    padding: 1rem 0;
    border-top: 1px solid #eee;
    display: flex;
  }

  .footer>* {
    flex: 1;
  }

  .q-picker-textfield.textfield:focus {
    border-bottom: none;
  }

  .q-picker-textfield.textfield:hover {
    border-bottom: none;
  }

  .q-picker-textfield.textfield {
    border-bottom: none;
  }

  .q-popover list[style] {
    min-width: initial;
  }

  .about {
    margin-top: 3rem;
    padding: 1rem 0;
    border-top: 1px solid #eee;
    display: flex;
  }

  .about>* {
    flex: 1;
  }

  i {
    vertical-align: top;
  }

  .info {
    margin: 1rem;
  }

  .card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .card img {
    width: 10rem;
  }
</style>
