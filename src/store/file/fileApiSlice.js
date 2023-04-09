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
    saveFile: builder.mutation({
      query: (file) => ({
        url: ``,
        method: 'POST',
        body: file,
      }),
      invalidatesTags: ['FileApi'],
    })
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
  useSaveFileMutation
} = fileApiSlice;