import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const userApiSlice = createApi({
  reducerPath: 'userApi',
  tagTypes: ['UserApi'],
  baseQuery: baseUri('/users'),
  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        method: 'GET'
      }),
      providesTags: ['UserApi']
    }),
    fetchUsers: builder.query({
      query: ({role, groupId, hasGroup}) => ({
        url: ``,
        method: 'GET',
        params: {role, groupId, hasGroup}
      }),
      providesTags: ['UserApi']
    }),
    saveUser: builder.mutation({
      query: (user) => ({
        url: ``,
        method: 'POST',
        body: user,
      }),
      invalidatesTags: ['UserApi'],
    }),
    updateUser: builder.mutation({
      query: (user) => ({
        url: ``,
        method: 'PUT',
        body: user,
      }),
      invalidatesTags: ['UserApi'],
    }),
    deleteUser: builder.mutation({
      query: () => ({
        url: ``,
        method: 'DELETE'
      }),
      invalidatesTags: ['UserApi'],
    }),
    assignUserRole: builder.mutation({
      query: ({userId, role}) => ({
        url: `/${userId}/roles/${role}`,
        method: 'PUT'
      }),
      invalidatesTags: ['UserApi'],
    }),
    unAssignUserRole: builder.mutation({
      query: ({userId, role}) => ({
        url: `/${userId}/roles/${role}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['UserApi'],
    })
  })
});

export const {
  useFetchUserQuery,
  useFetchUsersQuery,
  useSaveUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useAssignUserRoleMutation,
  useUnAssignUserRoleMutation
} = userApiSlice;