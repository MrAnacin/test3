import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const fetchData = createApi({
  reducerPath: 'fetchData',
  tagTypes: ['dataBack', 'comments', 'dataUser'],

  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/' }),

  endpoints: (build) => ({
    getPosts: build.query({
      query: ({ page, dataLimit }) => `/posts?_page=${page}&_limit=${dataLimit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'dataBack', id })),
              { type: 'dataBack', id: 'LIST' },
            ]
          : [{ type: 'dataBack', id: 'LIST' }],
      invalidatesTags: [{ type: 'dataBack', id: 'LIST' }],
    }),

    getComments: build.query({
      query: (id) => `/posts/${id}/comments`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'comments', id })),
              { type: 'comments', id: 'LIST' },
            ]
          : [{ type: 'dataBack', id: 'LIST' }],
      invalidatesTags: [{ type: 'comments', id: 'LIST' }],
    }),

    getDataUser: build.query({
      query: (id) => `/users/${id}`,
    }),
    
    getPostOneUser: build.query({
      query: (id) => `/users/${id}/posts`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'dataUser', id })),
              { type: 'dataUser', id: 'LIST' },
            ]
          : [{ type: 'dataUser', id: 'LIST' }],
      invalidatesTags: [{ type: 'dataUser', id: 'LIST' }],
    }),

  }),
});

export const { useGetPostsQuery, useGetCommentsQuery, useGetDataUserQuery, useGetPostOneUserQuery } = fetchData;
