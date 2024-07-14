import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout, setAuth } from "./features/auth/authSlice";
import { Mutex } from "async-mutex";

// Base URL for the API
const baseUrl = "http://localhost:2000";

// Create a mutex for managing concurrent requests
const mutex = new Mutex();

// Set up the base query with credentials included
const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include", // Include credentials in requests
});

// Custom query function with re-authentication logic
const baseQueryWithReauth = async (args, api, extraOptions) => {
  // Wait if there's an ongoing token refresh
  await mutex.waitForUnlock();

  // Perform the initial query
  let result = await baseQuery(args, api, extraOptions);

  // Check if the error is due to an unauthorized request (401)
  if (result.error && result.error.status === 401) {
    // If the mutex is not locked, attempt to refresh the token
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // Attempt to refresh the token
        const refreshResult = await baseQuery(
          {
            url: "/auth/refresh-token",
            method: "POST",
          },
          api,
          extraOptions
        );

        if (refreshResult.data) {
          // If refresh successful, update auth state
          api.dispatch(setAuth());

          // Retry the original query with new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refresh fails, log out the user
          api.dispatch(logout());
        }
      } finally {
        // Release the mutex
        release();
      }
    } else {
      // If mutex is locked, wait for it to unlock and retry the query
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

// Create the API slice
export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  // Uncomment and modify tag types as needed for your project
  // tagTypes: ["POSTS", "PROFILE", "LIKES", "BOOKMARKS", "EVENTS", "PROFILES"],
});
