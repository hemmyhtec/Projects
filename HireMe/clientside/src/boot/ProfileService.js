import { Api } from './axios'

class ProfileService {
  create(data) {
    return Api().post("/profiles", data);
  }
  getAll() {
    return Api().get('profiles');
  }
  get(id) {
    return Api().get(`/profiles/${id}`);
  }
  update(id, data) {
    return Api().put(`/profiles/${id}`, data);
  }
  delete(id) {
    return Api().delete(`/profiles/${id}`);
  }
  // show (profileId) {
  //   return Api().get(`songs/${profileId}`)
  // },
  // post (profile) {
  //   return Api().post('profles', profile)
  // },
  // put (profile) {
  //   return Api().put(`profiles/${profile.id}`, profile)
  // }
}
export default (function (/* { ssrContext } */) {
  return ProfileService
})
export { ProfileService }
