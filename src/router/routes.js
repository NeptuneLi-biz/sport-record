import DefaultLayout from 'layouts/MainLayout.vue';

const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '/CurriculumRecord',
        component: () => import('pages/CurriculumRecord.vue')
      },
      {
        path: '/SportItem',
        component: () => import('pages/SportItem/SportItem.vue'),
        children: [
          {
            path: '',
            name: 'SportItemTable',
            component: () => import('pages/SportItem/SportItemTable.vue')
          },
          {
            path: 'SportItemEdit/:sportTypeId',
            props: true,
            name: 'SportItemEdit',
            component: () => import('pages/SportItem/SportItemEdit.vue')
          }
        ]
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
      },
      {
        path: '/SportRecord',
        name: 'SportRecord',
        component: () => import('pages/SportRecord/SportRecord.vue'),
        redirect: 'SportRecordTable',
        children: [
          {
            path: '',
            name: 'SportRecordTable',
            component: () => import('pages/SportRecord/SportRecordTable.vue')
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
