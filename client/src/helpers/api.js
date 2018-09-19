import axios from 'axios';

export const sendRequest = (url, method = 'get', headers, body) => {
    switch (method) {
      case 'post':
        return axios.post(url, body, {
          headers,
        });
      case 'get':
        return axios.get(url, {
          headers,
        });
      case 'put':
        return axios.put(url, body, {
          headers,
        });
      case 'delete':
        return axios.delete(url, {
          headers,
        });
      default:
        return false;
    }
};
  