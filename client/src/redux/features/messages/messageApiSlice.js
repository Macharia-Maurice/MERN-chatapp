import { baseApi } from "@/redux/baseApiSlice";

const messageApiSlice = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        //create a message
        createMessage: builder.mutation({
            query: ({ chat_id, message }) => ({
                url: `/chats/${chat_id}/messages`,
                method: "POST",
                body: { message },
            }),
        }),

        //get all messages for a chat
        getMessages: builder.query({
            query: (chat_id) => `/chats/${chat_id}/messages`,
        }),
    }),
});