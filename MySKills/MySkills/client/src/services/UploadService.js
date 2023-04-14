import Api from '@/services/Api'

export default{
  post (upload) {
    return Api().post('upload', upload)
  }
}
