export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/HomeView.vue')
      }
    ]
  },
  {
    path: '/pins/:id',
    name: 'pins',
    component: () => import('@/views/pins/PinsView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login-register/LoginView.vue')
  }
]
