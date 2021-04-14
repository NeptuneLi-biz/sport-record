// TODO: 把他換成 $api
import { api } from 'boot/axios';

export default {
  // GetMany({ commit }, form) {
  //   return api.post('/auth/register', form).then((response) => {
  //     api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  //     commit('login', { token: response.data.token, user: response.data.user });
  //   });
  // }
  getMany() {
    return api.get('/SportType');
  },

  get(id) {
    return api.get(`/SportType/Edit?id=${id}`);
  },

  add(postData) {
    return api.post('/SportType/Add', postData);
  },

  edit(postData) {
    return api.post('/SportType/Edit', postData);
  }
};
