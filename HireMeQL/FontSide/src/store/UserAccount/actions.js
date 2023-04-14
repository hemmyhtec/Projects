import axios from 'axios'

export function USER_SIGNUP ({ commit }, payload){
    commit('Auth_User', {token: payload.id, user: payload})
    localStorage.setItem('token', payload.id)
    localStorage.setItem('user', payload)
    setAxiosHeaders(payload.id)
};

export function USER_LOGOUT ({ commit } ) {
    commit('DESTORY_USER')
};

export function USER_LOGIN ({ commit }, payload){
    commit('Auth_User', {token: payload.id, user: payload})
    localStorage.setItem('token', payload.id)
    localStorage.setItem('user', payload)
    setAxiosHeaders(payload.id)
};

function setAxiosHeaders(token){
    axios.defaults.headers.common['Authorization'] = 'Bearer' + token
}