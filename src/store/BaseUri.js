import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {URL} from "../config";
import {authService} from "../services/authService";

export default function baseUri(resource = "") {
  return fetchBaseQuery({
    baseUrl: URL + "/api" + resource,
    prepareHeaders: (headers) => {
      const authResult =  authService.getToken();
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer ' + authResult);
      headers.set('X-Cache', 'api');
      return headers;
    }
  })
}