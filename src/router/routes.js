 var importByName = (name) => {
   return {
     path: '/' + name,
     name: name,
     component: () => import('pages/' + name)
   }
 }
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
   importByName('Login'),
    {
      path: '/God/:god_name',
      name: 'God',
      component: () => import('pages/God')
    },
    {
      path: '/Recommand/:cat*',
      name: 'Recommand',
      component: () => import('pages/Recommand')
    },
   importByName('Collect'),
   importByName('Following'),
   importByName('TheMessage'),
   { // Always leave this as last one
     path: '*',
     component: () =>
       import('pages/404')
   }
 ]
