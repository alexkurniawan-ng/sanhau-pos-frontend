export default {
  path: '/delivery-order',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'PageMainDeliveryOrder',
      component: () => import('pages/DeliveryOrder/DeliveryOrderList.vue'),
    },
    {
      path: 'create',
      name: 'PageDeliveryOrderCreate',
      component: () => import('pages/DeliveryOrder/Form.vue'),
    },
    {
      path: 'today',
      name: 'PageDeliveryOrderToday',
      component: () => import('pages/DeliveryOrder/DeliveryToday.vue'),
    },
  ],
};
