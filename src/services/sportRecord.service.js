// TODO: 把他換成 $api
import { api } from 'boot/axios';

export default {
  // GetMany({ commit }, form) {
  //   return api.post('/auth/register', form).then((response) => {
  //     api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  //     commit('login', { token: response.data.token, user: response.data.user });
  //   });
  // }
  getMany(postData) {
    return api.post('/SportRecord/GetMany', postData);
  },

  get(id) {
    return api.get(`/SportRecord/Edit?id=${id}`);
  },

  add(postData) {
    return api.post('/SportRecord/Add', postData);
  },

  edit(postData) {
    return api.post('/SportRecord/Edit', postData);
  },

  delete(postData) {
    return api.post('/SportRecord/Delete', postData);
  }
};
