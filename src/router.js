import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

function assembly (name) {
  return { path: '/' + name, name: name, component: load(name) }
}
import Main from './components/Main.vue'

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
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    assembly('UserNameLogin'),
    { path: '/', name: 'Main', component: Main }, // Default
    { path: '/Recommand/:cat', name: 'Recommand', component: load('Recommand') },
    { path: '/ChangeLog', name: 'ChangeLog', component: load('ChangeLog') },
    { path: '/TheMessage/:message_id', name: 'TheMessage', component: load('TheMessage') },
    { path: '/God/:god_name', name: 'God', component: load('God') },
    { path: '*', component: load('Error404') } // Not found
  ]
})
