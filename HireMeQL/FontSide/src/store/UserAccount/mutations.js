export function Auth_User (state, payload) {
    state.token = payload.token
    state.user = payload.user
}

export function DESTORY_USER (state) {
    state.token = null
    state.user = null
    localStorage.removeItem('vuex')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
}