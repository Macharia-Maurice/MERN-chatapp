// src/redux/features/chats/chatApiSlice.js
import { baseApi } from "@/redux/baseApiSlice";

const chatApiSlice = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createChat: builder.mutation({
            query: ({ members }) => ({
                url: "/chats",
                method: "POST",
                body: { members },
            }),
        }),
        getChat: builder.query({
            query: (chat_id) => `/chats/${chat_id}`,
        }),
        getUserChats: builder.query({
            query: () => "/chats",
        }),
    }),
});

export const {
    useCreateChatMutation,
    useGetChatQuery,
    useGetUserChatsQuery
} = chatApiSlice;
