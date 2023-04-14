import { Store } from '../store/index'

function guard (to, from, next) {
  if (Store.state.isProfileLoggedIn) {
    next() // allow to enter route
  } else {
    next('') // go to '/login';
    console.log('Please Login')
  }
}

const routes = [
  {
    path: '/membership',
    beforeEnter: guard,
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/index/:id', component: () => import('pages/Index.vue'), name: 'Home' }, 
      { path: '/profile/:id', component: () => import('pages/Profile.vue'), name: 'Profile' },
      { path: '/settings/:id', component: () => import('pages/Settings.vue'), name: 'Settings' }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/FormLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue'), name: 'Login' },
      { path: '/register', component: () => import('pages/Register.vue'), name: 'Register' }
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
