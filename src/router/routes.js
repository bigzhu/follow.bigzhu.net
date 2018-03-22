function load(name) {
  return () =>
    import(`components/${name}`)
}

function assembly(name) {
  return {
    path: '/' + name,
    name: name,
    component: load(name)
  }
}
export default [
  assembly('Silver'),
  assembly('Gold'),
  assembly('Oauth'),
  assembly('Login'),
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
  { // Always leave this as last one
    path: '*',
    component: () =>
      import('pages/404')
  }
]
