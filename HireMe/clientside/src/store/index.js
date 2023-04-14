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
    profile: null,
    isProfileLoggedIn: false
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      if (token) {
        state.isProfileLoggedIn = true
      } else {
        state.isProfileLoggedIn = false
      }
    },
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  actions: {
    setToken ({ commit }, token) {
      commit('setToken', token)
    },
    setProfile ({ commit }, profile) {
      commit('setProfile', profile)
    }
  }
})
export default (function (/* { ssrContext } */) {
  return Store
})
export { Store }