import { Button } from "@/components/ui/button";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import useResponsiveDialog from "@/hooks/ResponsiveDialogHook";
import { ResponsiveDialog } from "@/components/wrappers/ResponsiveDialog";
import { useProfileMeQuery } from "@/redux/features/profiles/profileApiSlice";
import Logout from "./auth/Logout";

const Profile = () => {
	const {
		isDialogOpen: isEditProfileDialogOpen,
		handleOpenDialog: openEditProfileDialog,
		handleCloseDialog: closeEditProfileDialog,
	} = useResponsiveDialog("editProfile");

	const { data, error, isLoading } = useProfileMeQuery();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error loading profile</div>;
	}

	const { userProfile } = data;
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
						<Button onClick={openEditProfileDialog} className="mt-2">
							Edit Profile
						</Button>
					</div>
				</div>
			</div>
			<div className="mb-6">
				<h2 className="text-lg font-semibold">Bio</h2>
				<p className="text-gray-700">{bio}</p>
			</div>

			<ResponsiveDialog
				title="Edit Profile"
				description="Edit your profile"
				isOpen={isEditProfileDialogOpen}
				setIsOpen={closeEditProfileDialog}
			>
				<UpdateProfileForm />
			</ResponsiveDialog>
		</div>
	);
};

export default Profile;
