import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const fileApiSlice = createApi({
  reducerPath: 'fileApi',
  tagTypes: ['FileApi'],
  baseQuery: baseUri('/files'),
  endpoints: (builder) => ({
    fetchFiles: builder.query({
      query: () => ({
        url: ``,
        method: 'GET'
      }),
      transformResponse: (response) => response.map(toClientDepartmentRepresentation),
      providesTags: ['FileApi']
    }),
    addAccessToFiles: builder.mutation({
      query: ({fileIds, groupIds}) => ({
        url: `/access`,
        method: 'POST',
        body: {fileIds, groupIds},
      }),
      invalidatesTags: ['FileApi'],
    }),
    deleteFile: builder.mutation({
      query: (fileId) => ({
        url: `/${fileId}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['FileApi'],
    }),
  })
});

function toClientDepartmentRepresentation(obj) {
  return {
    ...obj,
    id: obj.fileId,
    name: obj.fileName
  };
}

export const {
  useFetchFilesQuery,
  useAddAccessToFilesMutation,
  useDeleteFileMutation
} = fileApiSlice;