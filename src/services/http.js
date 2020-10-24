import axios from 'axios';
import qs from 'qs';
import { apiRoot } from '../constants/serverApi';
import { AuthService } from './AuthService';

const authService = new AuthService();

export default function http({
  method,
  url,
  data,
  params,
  isFile,
  loadFile,
  onUploadProgress
}) {
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

  config['headers'] = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
    Authorization: 'Bearer ' + authService.getToken
  };

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error && error.response && error.response.status === 401) {
        authService.login();
      }
    }
  );

  return axios(config);
}
