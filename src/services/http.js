import axios from 'axios';
import qs from 'qs';
import history from '../utils/history';
import { apiRoot } from '../constants/serverApi';
import { SIGN_IN } from '../constants/links';

let updateTokenRequest = null;

const refresh = () => {
  if (updateTokenRequest) {
    return updateTokenRequest;
  }
  updateTokenRequest = axios({
    url:
      apiRoot + `auth/refresh-token?=${localStorage.getItem('RefreshToken')}`,
    method: 'get',
    timeout: 10000
  });
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

export default function http({
  method,
  url,
  data,
  params,
  handleToken,
  isFile
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
        error.response.status === 401 &&
        error.config &&
        !error.config.__isRetryRequest
      ) {
        return refresh()
          .then(res => {
            // localStorage.setItem('AuthToken', res.data.AuthToken);
            // localStorage.setItem('RefreshToken', res.data.RefreshToken);
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
      throw error;
    }
  );

  return axios(config);
}
