import { baseApi } from "@/redux/baseApiSlice";

const chatApiSlice = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder)=>({

        //create a chat
        createChat: builder.mutation({
            query:({members}) =>({
                url:"/chats",
                method:"POST",
                body:{members},
            }),
        }),

        //get a single chat(provide chat id)
        getChat: builder.query({
            query: (chat_id) => `/chats/${chat_id}`,
        }),

        //get all chats for user
        getUserChats: builder.query({
            query: () => "/chats",
        }),

    }),
});