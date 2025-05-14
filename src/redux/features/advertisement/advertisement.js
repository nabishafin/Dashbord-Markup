import { baseApi } from "../../baseApi/baseApi";
const advertisement = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addApprove: builder.mutation({
      query: (formdata) => ({
        url: "/advertisement/approve-or-reject-advertisement/",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["advertisement"],
    }),
    addReject: builder.mutation({
      query: ( formdata ) => ({
        url: "/advertisement/approve-or-reject-advertisement/",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["advertisement"],
    }),

    getAllAdvertisement: builder.query({
      query: () => ({
        url: "/advertisement",
        method: "GET",
      }),
      providesTags: ["advertisement"],
    }),
    getAdvertisementById: builder.query({
      query: (id) => ({
        url: `/advertisement/${id}`,
        method: "GET",
      }),
      providesTags: ["advertisement"],
    }),
  }),
});

export const {
  useAddApproveMutation,
  useAddRejectMutation,
  useGetAdvertisementByIdQuery,
  useGetAllAdvertisementQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useUpdateCategoryMutation,
} = advertisement;
