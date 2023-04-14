import { Store } from '../store/index'
import { Notify } from 'quasar'


function guardMentor (to, from, next) {
  if (Store.state.isMentorLoggedIn) {
    next() // allow to enter route
  } else {
    next('/login') // go to '/login';
    Notify.create({
      type: 'negative',
      color: 'negative',
      timeout: 1000,
      position: 'center',
      message: 'You do not have Access...Register as a Mentor'
    })
  }
}
function guardStudent (to, from, next) {
  if (Store.state.isStudentLoggedIn) {
    next() // allow to enter route
  } else {
    next('/loginstudent') // go to '/login';
    Notify.create({
      type: 'negative',
      color: 'negative',
      timeout: 1000,
      position: 'center',
      message: 'You do not have Access...Register as a Student'
    })
  }
}

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue'), name: 'Home'},
      { path: '/preview', component: () => import('pages/Preview.vue'), name: 'Preview'},
      { path: '/login', component: () => import('pages/Login.vue'), name: 'Login'},
      { path: '/loginstudent', component: () => import('pages/LoginStudent.vue'), name: 'LoginStudent'},
      { path: '/signup', component: () => import('pages/SignUp.vue'), name: 'SignUp'},
      { path: '/signupmentor', component: () => import('pages/SignUpMentor.vue'), name: 'SignUpMentor'}
    ]
  },
  {
    path: '/mentors',
    beforeEnter: guardMentor,
    component: () => import('layouts/MentorsLayout.vue'),
    children: [
      { path: '/updateprofilem/:id', component: () => import('pages/UpdateProfileM.vue'), name: 'UpdateProfileM'},
      { path: '/mentors/:id', component: () => import('pages/Mentors.vue'), name: 'Mentors'},
      { path: '/notifcation/:id', component: () => import('pages/Notification.vue'), name: 'Notification'},
      { path: '/message/:id', component: () => import('pages/Message.vue'), name: 'Message'},
      { path: '/profile/:id', component: () => import('pages/Profile.vue'), name: 'Profile'},
      { path: '/more/:id', component: () => import('pages/More.vue'), name: 'More'},
    ]
  },
  {
    path: '/student',
    beforeEnter: guardStudent,
    component: () => import('layouts/StudentsLayout.vue'),
    children: [
      // { path: '/updateprofiles/:id', component: () => import('pages/UpdateProfileS.vue'), name: 'UpdateProfileS'},
      { path: '/students/:id', component: () => import('pages/Students.vue'), name: 'Students'},
      { path: '/notifcations/:id', component: () => import('pages/Notifications.vue'), name: 'Notifications'},
      { path: '/messages/:id', component: () => import('pages/Messages.vue'), name: 'Messages'},
      { path: '/profiles/:id', component: () => import('pages/Profiles.vue'), name: 'Profiles'},
      { path: '/mores/:id', component: () => import('pages/Mores.vue'), name: 'Mores'},
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
