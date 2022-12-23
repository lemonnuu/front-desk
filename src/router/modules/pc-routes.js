export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/HomeView.vue'),
    children: []
  }
]
