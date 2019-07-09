import Vue from 'vue'
import Vuex from 'vuex'

import lib from 'bz-q-lib/src/store/lib'
import user from './user'
import main from './main'
import message from './message'
import god from './god'
import anki from './anki'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    anki,
    god,
    message,
    main,
    user,
    lib
  }
})

export default store
