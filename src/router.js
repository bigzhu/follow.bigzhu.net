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

let router = new VueRouter({
  mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   console.log(savedPosition)
  //   const layout = document.getElementsByClassName('layout-view')
  //   if (layout.length && to.name === 'God') {
  //     layout[0].scrollTop = 0
  //   } else return savedPosition
  // },
  routes: [
    { path: '/Following/:cat*', name: 'Following', component: load('Following') },
    assembly('UserNameLogin'),
    { path: '/', name: 'Main', component: Main }, // Default
    { path: '/Recommand/:cat*', name: 'Recommand', component: load('Recommand') },
    { path: '/ChangeLog', name: 'ChangeLog', component: load('ChangeLog') },
    { path: '/TheMessage/:message_id', name: 'TheMessage', component: load('TheMessage') },
    { path: '/God/:god_name', name: 'God', component: load('God') },
    { path: '*', component: load('Error404') } // Not found
  ]
})

export default router
