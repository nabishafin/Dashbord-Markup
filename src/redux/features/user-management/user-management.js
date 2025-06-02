import { baseApi } from "../../baseApi/baseApi";

const userManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: `/users/getAll`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    toggleBlockUser: builder.mutation({
      query: (userId) => ({
        url: `/admin/user/toggle-block`,
        method: "POST",
        body: { userId }, // Send userId inside the body as an object
      }),
      invalidatesTags: ["user", "DashboardStatus"],
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: "/admin/user/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useToggleBlockUserMutation,
  useDeleteUserMutation,
} = userManagementApi;
