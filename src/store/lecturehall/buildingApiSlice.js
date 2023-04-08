import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const buildingApiSlice = createApi({
  reducerPath: 'buildingApi',
  tagTypes: ['BuildingApi'],
  baseQuery: baseUri('/buildings'),
  endpoints: (builder) => ({
    fetchLectureHalls: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      transformResponse: (response) => toClientDepartmentRepresentation(response),
      providesTags: ['BuildingApi']
    }),
    saveLectureHall: builder.mutation({
      query: (building) => ({
        url: ``,
        method: 'POST',
        body: building,
      }),
      invalidatesTags: ['BuildingApi'],
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
  useFetchBuildingsQuery,
  useSaveBuildingMutation
} = buildingApiSlice;