import {apiRoot} from '../constants/serverApi';
import {authService} from "./authService";

export function http({method, url, body}) {
  return new Promise(async (resolve) => {
    const token = await authService.getToken();
    fetch(apiRoot + url, {
      method: method,
      body: body,
      headers: [["Authorization", "Bearer " + token]]
    }).then(response => resolve(response))
  })
}