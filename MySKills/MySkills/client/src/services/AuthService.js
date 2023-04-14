import Api from '@/services/Api'

export default{
  register (datas) {
    return Api().post('register', datas)
  },
  login (datas) {
    return Api().post('login', datas)
  }
}
