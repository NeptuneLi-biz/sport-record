// TODO: 把他換成 $api
import { api } from 'boot/axios';

export default {
  getMany(postData) {
    return api.post('/Curriculum/GetMany', postData);
  },

  get(postData) {
    return api.post('/Curriculum/Get', postData);
  },

  add(postData) {
    return api.post('/Curriculum/Add', postData);
  },

  edit(postData) {
    return api.post('/Curriculum/Edit', postData);
  },

  delete(postData) {
    return api.post('/Curriculum/Delete', postData);
  }
};
