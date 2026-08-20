import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { userLoggedIn, userLoggedOut } from "../auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const isRefreshEndpoint =
    args === "refresh" || (args as FetchArgs)?.url === "refresh";

  if (result.error && result.error.status === 401 && !isRefreshEndpoint) {
    const refreshResult: any = await baseQuery(
      { url: "refresh", method: "GET", credentials: "include" as const },
      api,
      extraOptions
    );

    if (refreshResult.data && refreshResult.data.success) {
      // Retry the initial query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // If refresh fails, log the user out
      api.dispatch(userLoggedOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    refreshToken: builder.query({
      query: (data) => ({
        url: "refresh",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,
            })
          );
        } catch (error: any) {
          // console.log(error);
        }
      },
    }),
  }),
});

export const { useRefreshTokenQuery, useLoadUserQuery } = apiSlice;