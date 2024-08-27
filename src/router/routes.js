import routerHome from './home';
import routerLogin from './login';
import routerInvoice from './invoice';
import routerProforma from './proforma';
import routerDeliveryOrder from './delivery';
import routerMemo from './memo';

const routes = [
  routerHome,
  routerLogin,
  routerInvoice,
  routerProforma,
  routerDeliveryOrder,
  routerMemo,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
