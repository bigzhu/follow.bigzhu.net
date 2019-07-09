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
     name: 'Main',
     component: () =>
       import('pages/Main')
   }, // Default

   {
     path: '/God/:starName',
     name: 'God',
     component: () =>
       import('pages/God')
   },
   {
     path: '/Recommand/:cat*',
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
     path: '/TheMessage/:id',
     name: 'TheMessage',
     component: () =>
       import('pages/TheMessage')
   },
   importByName('Collect'),
   { // Always leave this as last one
     path: '*',
     component: () =>
       import('pages/404')
   }
 ]
