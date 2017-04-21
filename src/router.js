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

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll
const scrollBehavior = (to, from, savedPosition) => {
  return { x: 0, y: 0 }
  // if (to.name === 'God') {
  //   console.log('to top')
  //   return { x: 0, y: 0 }
  // }
  // if (savedPosition) {
  //   // savedPosition is only available for popstate navigations.
  //   return savedPosition
  // } else {
  //   const position = {}
  //   // new navigation.
  //   // scroll to anchor by returning the selector
  //   if (to.hash) {
  //     position.selector = to.hash
  //   }
  //   // check if any matched route config has meta that requires scrolling to top
  //   if (to.matched.some(m => m.meta.scrollToTop)) {
  //     // cords will be used if no selector is provided,
  //     // or if the selector didn't match any element.
  //     position.x = 0
  //     position.y = 0
  //   }
  //   // if the returned position is falsy or an empty object,
  //   // will retain current scroll position.
  //   return position
  // }
}

let router = new VueRouter({
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
  // scrollBehavior: () => ({ y: 0 }),
  scrollBehavior,
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

export default router
