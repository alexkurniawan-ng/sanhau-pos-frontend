export default {
  path: '/proforma',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'PageMainProforma',
      component: () => import('pages/Proforma/ProformaList.vue'),
    },
    {
      path: 'create',
      name: 'PageProformaCreate',
      component: () => import('pages/Proforma/Form.vue'),
    },
  ],
};
