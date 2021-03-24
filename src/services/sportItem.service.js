// TODO: 把他換成 $api
import { api } from 'boot/axios';

export class SportItemService {
  // GetMany({ commit }, form) {
  //   return api.post('/auth/register', form).then((response) => {
  //     api.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
  //     commit('login', { token: response.data.token, user: response.data.user });
  //   });
  // }
  getMany() {
    console.log(this);
    return api.get('/SportType');
  }

  get(id) {
    // TODO: this 的問題要解決
    console.log(this);
    return api.get(`/SportType/Edit?id=${id}`);
  }

  add(postData) {
    console.log(this);
    return api.post('/SportType/Add', postData);
  }

  edit(postData) {
    console.log(this);
    return api.post('/SportType/Edit', postData);
  }
}
export default new SportItemService();
