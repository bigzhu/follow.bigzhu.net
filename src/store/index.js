import Vue from 'vue'
import Vuex from 'vuex'

import lib from '../libs/store'
import user from './user'
import main from './main'
import message from './message'
import god from './god'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    god,
    message,
    main,
    user,
    lib
  }
})

export default store
