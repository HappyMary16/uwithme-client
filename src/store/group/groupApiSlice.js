import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const groupApiSlice = createApi({
  reducerPath: 'groupApi',
  tagTypes: ['GroupApi'],
  baseQuery: baseUri('/groups'),
  endpoints: (builder) => ({
    fetchGroups: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['GroupApi']
    }),
    fetchGroupsByDepartment: builder.query({
      query: (departmentId) => ({
        url: ``,
        method: 'GET',
        params: {departmentId}
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['GroupApi']
    }),
    fetchGroupById: builder.query({
      query: (groupId) => ({
        url: `/${groupId}`,
        method: 'GET'
      }),
      transformResponse: (response) => toClientDepartmentRepresentation(response),
      providesTags: ['GroupApi']
    }),
    saveGroup: builder.mutation({
      query: (group) => ({
        url: ``,
        method: 'POST',
        body: group,
      }),
      invalidatesTags: ['GroupApi'],
    })
  })
});

function toClientDepartmentRepresentation(department) {
  return {
    ...department,
    value: department.id,
    label: department.name
  };
}

export const {
  useFetchGroupsQuery,
  useFetchGroupsByDepartmentQuery,
  useFetchGroupByIdQuery,
  useSaveGroupMutation
} = groupApiSlice;