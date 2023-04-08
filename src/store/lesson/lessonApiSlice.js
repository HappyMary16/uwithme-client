import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const lessonApiSlice = createApi({
  reducerPath: 'lessonApi',
  tagTypes: ['LessonApi'],
  baseQuery: baseUri('/lessons'),
  endpoints: (builder) => ({
    fetchLessons: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      providesTags: ['LessonApi']
    }),
    fetchLessonsByQueryParams: builder.query({
      query: ({groupId, userId}) => ({
        url: ``,
        method: 'GET',
        params: {groupId, userId}
      }),
      providesTags: ['LessonApi']
    }),
    saveLessons: builder.mutation({
      query: (lesson) => ({
        url: ``,
        method: 'POST',
        body: lesson,
      }),
      invalidatesTags: ['LessonApi'],
    }),
    deleteLessons: builder.mutation({
      query: (lessonsToDelete) => ({
        url: ``,
        method: 'DELETE',
        body: lessonsToDelete,
      }),
      invalidatesTags: ['LessonApi'],
    })
  })
});

export const {
  useFetchLessonsQuery,
  useFetchLessonsByQueryParamsQuery,
  useSaveLessonsMutation,
  useDeleteLessonsMutation
} = lessonApiSlice;