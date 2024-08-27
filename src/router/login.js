export default {
  path: '/login',
  component: () => import('layouts/BaseLayout.vue'),
  children: [
    {
      path: '',
      name: 'PageAuthenticationLogin',
      component: () => import('pages/Authentication/Login.vue'),
    },
  ],
};
