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
  {
    path: '/',
    name: 'Main',
    component: () => import('pages/Main')
  }, // Default
  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
