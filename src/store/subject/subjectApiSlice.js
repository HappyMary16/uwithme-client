import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const subjectApiSlice = createApi({
  reducerPath: 'subjectApi',
  tagTypes: ['SubjectApi'],
  baseQuery: baseUri('/subjects'),
  endpoints: (builder) => ({
    fetchSubjects: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['SubjectApi']
    }),
    fetchSubjectsByUserId: builder.query({
      query: (userId) => ({
        url: ``,
        method: 'GET',
        params: {userId}
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['SubjectApi']
    }),
    saveSubject: builder.mutation({
      query: (building) => ({
        url: ``,
        method: 'POST',
        body: building,
      }),
      invalidatesTags: ['SubjectApi'],
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
  useFetchSubjectsQuery,
  useFetchSubjectsByUserIdQuery,
  useSaveSubjectMutation
} = subjectApiSlice;