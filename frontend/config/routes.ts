export default [
  {
    name: 'pool',
    icon: 'table',
    path: '/list',
    component: './NodePool',
  },
  {
    path: '/',
    redirect: '/list',
  },
  {
    component: './404',
  },
];
