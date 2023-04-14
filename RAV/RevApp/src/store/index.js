// import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'

// import example from './module-example'
// import userAccount from './UserAccount'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const Store = createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    isMentorLoggedIn: false,
    isStudentLoggedIn: false,
    // isProfileUpdated: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isMentorLoggedIn = true
      } else {
        state.isMentorLoggedIn = false
      }
      if (token) {
        state.isStudentLoggedIn = true
      } else {
        state.isStudentLoggedIn = false
      }

    },
    setUser (state, user) {
      state.user = user
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setUser ({ commit }, user) {
      commit('setUser', user)
    }
  }
})
export default (function (/* { ssrContext } */) {
  return Store
})
export { Store }