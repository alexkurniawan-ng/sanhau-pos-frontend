export default {
  path: '/memo',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      name: 'PageMainMemo',
      component: () => import('pages/Memo/MemoList.vue'),
    },
    {
      path: 'create',
      name: 'PageMemoCreate',
      component: () => import('pages/Memo/Form.vue'),
    },
  ],
};
