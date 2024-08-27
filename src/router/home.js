export default {
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'PageMainHome',
      component: () => import('src/pages/Main/MainHome.vue'),
    },
  ],
};
