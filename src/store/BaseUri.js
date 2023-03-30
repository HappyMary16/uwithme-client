import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {URL} from "../config";
import {authService} from "../services/authService";

export default function baseUri(resource = "") {
  return fetchBaseQuery({
    baseUrl: URL + "/api" + resource,
    prepareHeaders: async (headers) => {
      const authResult = await authService.getToken();
      headers.set('Authorization', 'Bearer ' + authResult);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  })
}