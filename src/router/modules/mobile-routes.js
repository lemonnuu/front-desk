export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/main/HomeView.vue')
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/PinsView.vue')
  }
]
