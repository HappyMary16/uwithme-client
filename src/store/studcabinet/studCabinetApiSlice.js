import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const studCabinetApiSlice = createApi({
  reducerPath: 'studCabinetApi',
  tagTypes: ['StudentInfoApi', 'StudentsRatingApi'],
  baseQuery: baseUri("/studcab"),
  endpoints: (builder) => ({
    fetchStudentInfo: builder.query({
      query: (credentials) => ({
        url: `/students`,
        method: 'POST',
        body: credentials
      }),
      providesTags: ['StudentInfoApi']
    }),
    fetchStudentsRating: builder.query({
      query: ({credentials, semester}) => ({
        url: `/rating/${semester}`,
        method: 'POST',
        body: credentials
      }),
      providesTags: ['StudentsRatingApi']
    }),
    fetchStudentScores: builder.query({
      query: ({credentials, semester}) => ({
        url: `/scores/${semester}`,
        method: 'POST',
        body: credentials
      }),
      providesTags: ['StudentsRatingApi']
    }),
    fetchStudentDebts: builder.query({
      query: (credentials) => ({
        url: `/debts`,
        method: 'POST',
        body: credentials
      }),
      providesTags: ['StudentsRatingApi']
    }),
    fetchSyllabus: builder.query({
      query: ({credentials, semester}) => ({
        url: `/syllabus/${semester}`,
        method: 'POST',
        body: credentials
      }),
      providesTags: ['Syllabus']
    })
  })
});

export const {
  useFetchStudentInfoQuery,
  useFetchStudentsRatingQuery,
  useFetchStudentScoresQuery,
  useFetchStudentDebtsQuery,
  useFetchSyllabusQuery
} = studCabinetApiSlice;