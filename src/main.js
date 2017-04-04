// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
require(`./themes/app.${__THEME}.styl`)
// ==============================

import Vue from 'vue'
import Vuex from 'vuex'
import Quasar from 'quasar'
import router from './router'

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// set lang
var lang = window.localStorage.getItem('lang') || 'cn'
Vue.config.lang = lang
// set locales
import locales from './locales'
Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})

Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuex)

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
