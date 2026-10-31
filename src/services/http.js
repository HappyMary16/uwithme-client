import {apiRoot} from '../constants/serverApi';
import {authService} from "./authService";

export function http({method, url, body, isJson}) {
  return new Promise(resolve => {
    const headers = [
      ["X-Cache", "files"]
    ];

    if (isJson) {
      headers.push(["Content-Type", "application/json"])
    }

    fetch(apiRoot + url, {
      method: method,
      body: isJson ? JSON.stringify(body) : body,
      headers: headers
    }).then(response => {
      if (response.status === 401) {
        authService.login();
      }
      resolve(response);
    })
  })
}