import DefaultLayout from 'layouts/MainLayout.vue';

const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  {
    // TEST: path 先改到預設路徑
    path: '/',
    // path: '/Record',
    component: DefaultLayout,
    children: [
      { path: '', component: () => import('pages/Record.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
];

export default routes;
