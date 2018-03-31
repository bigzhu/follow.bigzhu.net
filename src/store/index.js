import Vue from 'vue'
import Vuex from 'vuex'

import lib from '../libs/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    lib
  }
})

export default store
