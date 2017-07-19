import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load(component) {
  // '@' is aliased to src/components
  return () => System.import(`@/${component}.vue`)
}

function assembly(name) {
  return {
    path: '/' + name,
    name: name,
    component: load(name)
  }
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [
    assembly('GodBlocked'),
    assembly('UserSet'),
    assembly('Collect'),
    {
      path: '/BioDetail/:god_name',
      name: 'BioDetail',
      component: load('BioDetail')
    },
    assembly('Bio'),
    {
      path: '/Following/:cat*',
      name: 'Following',
      component: load('Following')
    },
    assembly('UserNameLogin'),
    {
      path: '/',
      name: 'Main',
      component: load('Main')
    }, // Default
    {
      path: '/Recommand/:cat*',
      name: 'Recommand',
      component: load('Recommand')
    },
    {
      path: '/ChangeLog',
      name: 'ChangeLog',
      component: load('ChangeLog')
    },
    {
      path: '/TheMessage/:id',
      name: 'TheMessage',
      component: load('TheMessage')
    },
    {
      path: '/God/:god_name',
      name: 'God',
      component: load('God')
    },
    {
      path: '*',
      component: load('Error404')
    } // Not found
  ]
})
