import request from '@/utils/request.js';

const BASE_API = '/user';

export default {
  login(data) {
    return request({
      url: BASE_API + '/login',
      method: 'post',
      data,
    });
  },
  change_avatar(data) {
    return request({
      url: BASE_API + '/change_avatar',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  edit_user(data) {
    return request({
      url: BASE_API + '/edit_user',
      method: 'post',
      data,
    });
  },
};
