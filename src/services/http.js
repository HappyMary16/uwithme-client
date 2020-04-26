import axios from 'axios';
import qs from 'qs';
import { history } from '../store/Store';
import { apiRoot } from '../constants/serverApi';
import { SIGN_IN } from '../constants/links';

const refresh = () => {
  return http({
    url: '/auth/refreshToken',
    method: 'post',
    data: {
      refreshToken: localStorage.getItem('RefreshToken')
    }
  });
};

const reRequest = request => {
  const handleToken = localStorage.getItem('AuthToken');
  const config = {
    url: request.url.replace(apiRoot, ''),
    method: request.method,
    handleToken: handleToken
  };
  if (request.data) {
    config['data'] = request.data;
  }
  if (request.params) {
    config['params'] = request.params;
  }
  return http(config)
    .then(res => {
      return res;
    })
    .catch(err => {
      return err;
    });
};

export default function http(
  {
    method,
    url,
    data,
    params,
    isFile,
    loadFile
  }) {
  const token = localStorage.getItem('AuthToken');
  const config = {
    method: method.toLowerCase(),
    url: apiRoot + url,
    params,
    paramsSerializer: function(p) {
      return qs.stringify(p, { arrayFormat: 'repeat' });
    }
  };
  if (data) config['data'] = data;

  if (loadFile) {
    config['responseType'] = 'arraybuffer';
  }

  if (token) {
    config['headers'] = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
      Authorization: 'Bearer ' + token
    };
  } else {
    config['headers'] = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
  }

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (
        error &&
        error.response &&
        (error.response.status === 401 || error.response.status === 403) &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        return refresh()
          .then(res => {
            localStorage.setItem('AuthToken', res.data.authToken);
            localStorage.setItem('RefreshToken', res.data.refreshToken);
            return res;
          })
          .then(() => {
            return reRequest(error.config);
          })
          .catch(() => {
            history.push(SIGN_IN);
          });
      }
      throw error;
    }
  );

  return axios(config);
}
