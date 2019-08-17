import Vue from 'vue'
import Vuex from 'vuex'

import lib from 'bz-q-lib/src/store/lib'
import user from './user'
import main from './main'
import message from './message'
import star from './star'
import anki from './anki'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    anki,
    star,
    message,
    main,
    user,
    lib
  }
})

export default store
