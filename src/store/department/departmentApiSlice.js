import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const departmentApiSlice = createApi({
  reducerPath: 'departmentApi',
  tagTypes: ['DepartmentApi'],
  baseQuery: baseUri('/departments'),
  endpoints: (builder) => ({
    fetchDepartment: builder.query({
      query: (departmentId) => ({
        url: `/${departmentId}`,
        method: 'GET'
      }),
      transformResponse: (response) => toClientDepartmentRepresentation(response),
      providesTags: ['DepartmentApi']
    }),
    fetchSubDepartments: builder.query({
      query: (mainDepartmentId) => ({
        url: `/${mainDepartmentId}/sub-departments`,
        method: 'GET'
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['DepartmentApi']
    }),
    fetchDepartmentsByUniversityId: builder.query({
      query: (universityId) => ({
        url: ``,
        method: 'GET',
        params: {universityId}
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['DepartmentApi']
    }),
    saveDepartment: builder.mutation({
      query: (department) => ({
        url: ``,
        method: 'POST',
        body: department,
      }),
      invalidatesTags: ['DepartmentApi'],
    }),
    deleteDepartment: builder.mutation({
      query: (departmentId) => ({
        url: `/${departmentId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['DepartmentApi'],
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
  useFetchDepartmentQuery,
  useFetchSubDepartmentsQuery,
  useFetchDepartmentsByUniversityIdQuery,
  useSaveDepartmentMutation,
  useDeleteDepartmentMutation
} = departmentApiSlice;