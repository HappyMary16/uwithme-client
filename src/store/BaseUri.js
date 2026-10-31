import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {authService} from "../services/authService";

export default function baseUri(resource = "") {
  const baseQuery = fetchBaseQuery({
    baseUrl: "/api" + resource,
    prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('X-Cache', 'api');
      return headers;
    }
  });

  return async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
      authService.login();
    }
    return result;
  };
}
