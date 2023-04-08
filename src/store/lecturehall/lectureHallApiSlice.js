import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const lectureHallApiSlice = createApi({
  reducerPath: 'lectureHallApi',
  tagTypes: ['LectureHallApi'],
  baseQuery: baseUri('/lectureHalls'),
  endpoints: (builder) => ({
    fetchLectureHalls: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      transformResponse: (response) => toClientDepartmentRepresentation(response),
      providesTags: ['LectureHallApi']
    }),
    saveLectureHall: builder.mutation({
      query: (lectureHall) => ({
        url: ``,
        method: 'POST',
        body: lectureHall,
      }),
      invalidatesTags: ['LectureHallApi'],
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
  useFetchLectureHallsQuery,
  useSaveLectureHallMutation
} = lectureHallApiSlice;