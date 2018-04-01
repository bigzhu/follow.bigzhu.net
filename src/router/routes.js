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
   importByName('God'),
   importByName('Collect'),
   importByName('Following'),
   importByName('TheMessage'),
   importByName('Recommand'),
   { // Always leave this as last one
     path: '*',
     component: () =>
       import('pages/404')
   }
 ]
