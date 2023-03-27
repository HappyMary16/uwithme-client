import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {URL} from "../../config";
import {authService} from "../../services/authService";

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  tagTypes: ['AuthApi'],
  baseQuery: fetchBaseQuery({
    baseUrl: URL + "/api/auth",
    prepareHeaders: async (headers) => {
      const authResult = await authService.getToken();
      headers.set('Authorization', 'Bearer ' + authResult);
      headers.set('Content-Type', 'application/json');
      return headers;
    }
  }),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: () => ({
        url: `/signIn`,
        method: 'GET'
      }),
      providesTags: ['AuthApi']
    }),
    saveUser: builder.mutation({
      query: (uwmUser) => ({
        url: `/signUp`,
        method: 'POST',
        body: uwmUser,
      }),
      invalidatesTags: ['AuthApi'],
    })
  })
});

export const {useFetchUserQuery, useSaveUserMutation} = authApiSlice;