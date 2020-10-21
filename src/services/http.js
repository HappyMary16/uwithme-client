import axios from 'axios';
import qs from 'qs';
import { history } from '../store/Store';
import { apiRoot, REFRESH_TOKEN } from '../constants/serverApi';
import { SIGN_IN } from '../constants/links';

let updateTokenRequest = null;

const refresh = () => {
  if (updateTokenRequest) {
    return updateTokenRequest;
  }

  const config = {
    method: 'post',
    url: apiRoot + REFRESH_TOKEN,
    data: {
      refreshToken: localStorage.getItem('RefreshToken')
    },
    timeout: 10000
  };

  config['headers'] = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  updateTokenRequest = axios(config);
  return updateTokenRequest;
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
      updateTokenRequest = null;
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
    loadFile,
    onUploadProgress
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
  if (onUploadProgress) config['onUploadProgress'] = e => onUploadProgress(e);

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
        error.response.status === 403 &&
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
            updateTokenRequest = null;
            history.push(SIGN_IN);
          });
      }

      if (error &&
        error.response &&
        error.response.status === 401) {

        history.push(SIGN_IN);
        updateTokenRequest = null;
      }

      throw error;
    }
  );

  return axios(config);
}
