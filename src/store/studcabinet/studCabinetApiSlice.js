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
        method: 'GET',
        params: credentials
      }),
      providesTags: ['StudentInfoApi']
    }),
    fetchStudentsRating: builder.query({
      query: ({credentials, semester}) => ({
        url: `/rating/${semester}`,
        method: 'GET',
        params: credentials
      }),
      providesTags: ['StudentsRatingApi']
    }),
    fetchStudentScores: builder.query({
      query: ({credentials, semester}) => ({
        url: `/scores/${semester}`,
        method: 'GET',
        params: credentials
      }),
      providesTags: ['StudentsRatingApi']
    }),
    fetchStudentDebts: builder.query({
      query: (credentials) => ({
        url: `/debts`,
        method: 'GET',
        params: credentials
      }),
      providesTags: ['StudentsRatingApi']
    })
  })
});

export const {useFetchStudentInfoQuery,
  useFetchStudentsRatingQuery,
  useFetchStudentScoresQuery,
  useFetchStudentDebtsQuery} = studCabinetApiSlice;