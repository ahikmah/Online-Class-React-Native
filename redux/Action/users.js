import axios from 'axios';

export const getUserList = (url, token) => {
  return {
    type: 'GET_USER_LIST',
    payload: axios.get(url, {
      headers: {'x-access-token': `Bearer ${token}`},
    }),
  };
};
