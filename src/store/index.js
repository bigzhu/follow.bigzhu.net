import Vue from 'vue'
import Vuex from 'vuex'

import lib from '../libs/store'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    lib
  }
})

export default store
