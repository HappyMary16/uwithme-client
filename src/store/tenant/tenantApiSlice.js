import {createApi} from "@reduxjs/toolkit/dist/query/react";
import baseUri from "../BaseUri";

export const tenantApiSlice = createApi({
  reducerPath: 'tenantApi',
  tagTypes: ['TenantApi'],
  baseQuery: baseUri(),
  endpoints: (builder) => ({
    fetchTenants: builder.query({
      query: () => ({
        url: `/info/universities`,
        method: 'GET'
      }),
      transformResponse: (response) =>
        response.map(obj => ({
          value: obj.id,
          label: obj.name
        })),
      providesTags: ['TenantApi']
    })
  })
});

export const {useFetchTenantsQuery} = tenantApiSlice;