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
      transformResponse: (response) => response.map(toClientRepresentation),
      providesTags: ['SubjectApi']
    }),
    fetchSubjectsByUserId: builder.query({
      query: (userId) => ({
        url: ``,
        method: 'GET',
        params: {userId}
      }),
      transformResponse: (response) => response.map(toClientRepresentation),
      providesTags: ['SubjectApi']
    }),
    saveSubject: builder.mutation({
      query: (subject) => ({
        url: ``,
        method: 'POST',
        body: subject,
      }),
      invalidatesTags: ['SubjectApi'],
    })
  })
});

function toClientRepresentation(subject) {
  return {
    ...subject,
    value: subject.id??subject.subjectId,
    label: subject.name??subject.subjectName
  };
}

export const {
  useFetchSubjectsQuery,
  useFetchSubjectsByUserIdQuery,
  useSaveSubjectMutation
} = subjectApiSlice;