import axios from 'axios';
import qs from 'qs';
import { apiRoot } from '../constants/serverApi';
import { AuthService } from './AuthService';

export default async function http({
  method,
  url,
  data,
  params,
  isFile,
  loadFile,
  onUploadProgress
}) {
  const authService = new AuthService();
  await authService.loadUser();

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
    Authorization: 'Bearer ' + (await authService.getToken())
  };

  axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      return error && error.response;
    }
  );

  return axios(config);
}
