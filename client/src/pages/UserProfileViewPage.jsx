import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetUserProfileQuery } from "@/redux/features/profiles/profileApiSlice";
import { Button } from "@/components/ui/button";

const UserProfileView = () => {
	const { profile_id } = useParams();
	const {
		data: profileData,
		error: profileError,
		isLoading: profileLoading,
	} = useGetUserProfileQuery(profile_id);

	if (profileLoading) return <div>Loading profile...</div>;
	if (profileError) return <div>Error loading profile</div>;
	if (!profileData || !profileData.userProfile)
		return <div>No profile data available</div>;

	const { userProfile } = profileData;
	const { profilePicture, bio, user } = userProfile;
	const { first_name, last_name, email } = user;

	return (
		<div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
			<div className="flex items-center justify-between mb-6">
				<div className="flex items-center">
					<div className="rounded-full overflow-hidden mr-4">
						{profilePicture && (
							<img
								src={`http://localhost:2000/${profilePicture}`}
								alt="Profile"
								className="h-24 w-24 object-cover"
							/>
						)}
					</div>
					<div>
						<h1 className="text-2xl font-bold">{`${first_name} ${last_name}`}</h1>
						<p className="text-gray-600">{email}</p>
					</div>
				</div>
			</div>
			<div className="mb-6">
				<h2 className="text-lg font-semibold">Bio</h2>
				<p className="text-gray-700">{bio}</p>
			</div>
			<Link to="/home">
				<Button>Message</Button>
			</Link>
		</div>
	);
};

export default UserProfileView;
