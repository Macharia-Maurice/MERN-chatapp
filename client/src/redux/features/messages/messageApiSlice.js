// src/redux/features/messages/messageApiSlice.js
import { baseApi } from "@/redux/baseApiSlice";

const messageApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		createMessage: builder.mutation({
			query: ({ chat_id, text, replyTo }) => ({
				url: `/messages/${chat_id}`,
				method: "POST",
				body: { text, replyTo },
			}),
		}),

		getAllMessages: builder.query({
			query: (chat_id) => `/messages/${chat_id}`,
		}),
		seenBy: builder.mutation({
			query: (message_id) => ({
				url: `/messages/${message_id}/seen`,
				method: "PATCH",
			}),
		}),
	}),
});

export const {
	useCreateMessageMutation,
	useGetAllMessagesQuery,
	useSeenByMutation,
} = messageApiSlice;
