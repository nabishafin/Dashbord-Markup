import { baseApi } from "../../baseApi/baseApi";

const subscription = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation to add a subscription
    MakeScription: builder.mutation({
      query: (data) => ({
        url: "/subscription",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["report"],
    }),

    // Query to get all subscriptions
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription",
        method: "GET",
      }),
      providesTags: ["subscription"],
    }),

    // Mutation to update a subscription
    UpdateSubscription: builder.mutation({
      query: ({ id, data }) => ({
        url: `subscription/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["subscription"],
    }),
  }),
});

export const {
  useGetAllSubscriptionQuery,
  useMakeScriptionMutation,  // Exported correctly
  useUpdateSubscriptionMutation,
} = subscription;
