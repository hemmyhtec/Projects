import { Store } from '../store/index'

function guard (to, from, next) {
  if (Store.state.isProfileLoggedIn) {
    next() // allow to enter route
  } else {
    next('/login') // go to '/login';
  }
}

const routes = [
  {
    path: '/MemberShip',
    beforeEnter: guard,
    component: () => import('layouts/MemberShip.vue'),
    children: [
      { path: '/profile', component: () => import('pages/Profile.vue'), name: 'Profile' }
      // { path: '/settings', component: () => import('pages/Settings.vue'), name: 'Settings' }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/UserRL.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/login', component: () => import('pages/Login.vue'), name: 'Login' },
      { path: '/profile', component: () => import('pages/Profile.vue'), name: 'Profile' }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
