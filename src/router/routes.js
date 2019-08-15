import importByName from 'bz-q-lib/src/functions/importByName'
export default [
  /*
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') }
    ]
  },
  */
  importByName('UserSet'),
  importByName('Oauth'),
  importByName('Login'),
  {
    path: '/',
    redirect: { name: 'Main' }
  },
  {
    path: '/main',
    name: 'Main',
    component: () =>
      import('pages/Main')
  }, // Default

  {
    path: '/star/:StarName',
    name: 'Star',
    component: () =>
      import('pages/Star')
  },
  {
    path: '/recommand/:cat*',
    name: 'Recommand',
    component: () =>
      import('pages/Recommand')
  },
  {
    path: '/Following/:cat*',
    name: 'Following',
    component: () =>
      import('pages/Following')
  },
  {
    path: '/message/:id',
    name: 'TheMessage',
    component: () =>
      import('pages/Message')
  },
  importByName('Collect'),
  { // Always leave this as last one
    path: '*',
    component: () =>
      import('pages/404')
  }
]
