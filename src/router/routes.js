import DefaultLayout from 'layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/Record',
        component: () => import('pages/Record.vue')
      },
      {
        path: '/SportType',
        name: 'SportType',
        component: () => import('pages/SportType/SportType.vue'),
        redirect: 'SportTypeTable',
        children: [
          {
            path: '',
            name: 'SportTypeTable',
            component: () => import('pages/SportType/SportTypeTable.vue')
          },
          {
            path: 'SportTypeEdit/:typeId',
            props: true,
            name: 'SportTypeEdit',
            component: () => import('pages/SportType/SportTypeEdit.vue')
          }
        ]
      }
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
