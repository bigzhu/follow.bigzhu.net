// === DEFAULT / CUSTOM STYLE === // WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
// require(`quasar/dist/quasar.${__THEME}.css`)
require(`./themes/app.${__THEME}.styl`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuex from 'vuex'
import Quasar from 'quasar'
import router from './router'
import errorToast from './functions/errorToast'
errorToast()
Vue.config.productionTip = false
// set lang
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
var lang = window.localStorage.getItem('lang') || 'cn'
// set locales
import locales from './locales'

const i18n = new VueI18n({
  locale: lang, // set locale
  messages: locales // set locale messages
})

Vue.use(Quasar) // Install Quasar Framework
Vue.use(Vuex)

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
// import 'quasar-extras/ionicons'
// import 'quasar-extras/fontawesome'
// import 'quasar-extras/animate'

Quasar.start(() => {
  /* eslint-disable no-new */
  new Vue({
    i18n,
    el: '#q-app',
    router,
    render: h => h(require('./App'))
  })
})
