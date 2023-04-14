import Api from '@/services/Api'

export default{
  index () {
    return Api().get('profile')
  },
  post (profile) {
    return Api().post('profile', profile)
  }
}
