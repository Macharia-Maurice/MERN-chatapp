import { baseApi } from "@/redux/baseApiSlice";

const profileApiSlice = baseApi.injectEndpoints({
	overrideExisting: true,
	endpoints: (builder) => ({
		updateProfile: builder.mutation({
			query: ({ bio }) => ({
				url: "/profiles",
				method: "PATCH",
				body: { bio },
			}),
		}),

		updateProfilePicture: builder.mutation({
			query: ({ profilePicture }) => {
				const formdata = new FormData();
				formdata.append("profilePicture", profilePicture);

				return {
					url: "/profiles/picture",
					method: "PATCH",
					body: formdata,
				};
			},
		}),

		listAllProfiles: builder.query({
			query: () =>"/profiles",

		}),

		profileMe: builder.query({
			query: ()=>"/profiles/me",
		}),

		getUserProfile: builder.query({
			query: (profile_id)=>`/profiles/${profile_id}`,
		}),


	}),
});

export const {
	useUpdateProfileMutation,
	useUpdateProfilePictureMutation,
	useListAllProfilesQuery,
	useGetUserProfileQuery,
	useProfileMeQuery,
} = profileApiSlice;
