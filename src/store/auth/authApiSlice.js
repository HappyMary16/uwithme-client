import {createApi} from '@reduxjs/toolkit/query/react';
import baseUri from "../BaseUri";

export const authApiSlice = createApi({
  reducerPath: 'authApi',
  tagTypes: ['AuthApi'],
  baseQuery: baseUri("/auth"),
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