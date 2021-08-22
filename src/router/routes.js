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
        path: '/SportType',
        component: () => import('pages/SportType/SportType.vue'),
        children: [
          {
            path: '',
            name: 'SportTypeTable',
            component: () => import('pages/SportType/SportTypeTable.vue')
          },
          {
            path: 'SportTypeEdit/:sportTypeId',
            props: true,
            name: 'SportTypeEdit',
            component: () => import('pages/SportType/SportTypeEdit.vue')
          }
        ]
      },
      {
        path: '/CurriculumSetting',
        name: 'CurriculumSetting',
        component: () => import('pages/CurriculumSetting/CurriculumSetting.vue'),
        redirect: 'CurriculumSettingTable',
        children: [
          {
            path: '',
            name: 'CurriculumSettingTable',
            component: () => import('pages/CurriculumSetting/CurriculumSettingTable.vue')
          },
          {
            path: 'CurriculumSettingEdit/:curriculumId',
            props: true,
            name: 'CurriculumSettingEdit',
            component: () => import('pages/CurriculumSetting/CurriculumSettingEdit.vue')
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
