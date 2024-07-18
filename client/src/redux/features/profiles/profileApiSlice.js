import { baseApi } from "@/redux/baseApiSlice";

const profileApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		updateProfile: builder.mutation({
			query: ({ bio }) => ({
				url: "/profile",
				method: "PATCH",
				body: { bio },
			}),
		}),

		updateProfilePicture: builder.mutation({
			query: ({ profilePicture }) => {
				const formdata = new FormData();
				formdata.append("profilePicture", profilePicture);

				return {
					url: "/profile/picture",
					method: "PATCH",
					body: formdata,
				};
			},
		}),

		listAllProfiles: builder.query({
			query: () =>"/profile",

		}),

		profileMe: builder.query({
			query: ()=>"/profile/me",
		}),


	}),
});

export const {
	useUpdateProfileMutation,
	useUpdateProfilePictureMutation,
	useListAllProfilesQuery,
	useProfileMeQuery,
} = profileApiSlice;
