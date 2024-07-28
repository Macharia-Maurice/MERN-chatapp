import { Button } from "@/components/ui/button";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import useResponsiveDialog from "@/hooks/ResponsiveDialogHook";
import { ResponsiveDialog } from "@/components/wrappers/ResponsiveDialog";
import { useProfileMeQuery, useGetUserProfileQuery } from "@/redux/features/profiles/profileApiSlice";
import { Link, useParams } from "react-router-dom";

const Profile = () => {
  const { profile_id } = useParams(); // Get the profile_id from the URL
  const {
    isDialogOpen: isEditProfileDialogOpen,
    handleOpenDialog: openEditProfileDialog,
    handleCloseDialog: closeEditProfileDialog,
  } = useResponsiveDialog("editProfile");

  // Fetch the current user's profile
  const { data: meData, error: meError, isLoading: meLoading } = useProfileMeQuery();
  
  // Fetch another user's profile if profile_id is provided
  const { data: userData, error: userError, isLoading: userLoading } = useGetUserProfileQuery(profile_id, {
    skip: !profile_id, // Skip the query if no profile_id is provided
  });

  const isCurrentUserProfile = !profile_id; // Determine if it's the current user's profile

  if (meLoading || (profile_id && userLoading)) {
    return <div>Loading...</div>;
  }

  if (meError || (profile_id && userError)) {
    return <div>Error loading profile</div>;
  }

  const { profilePicture, bio, user } = profile_id ? userData.userProfile : meData.userProfile;
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
            {isCurrentUserProfile && (
              <Button
                onClick={openEditProfileDialog}
                className="mt-2">
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Bio</h2>
        <p className="text-gray-700">{bio}</p>
      </div>
      {isCurrentUserProfile && (
        <Link to={"/logout"}>
          <Button variant="destructive">Logout</Button>
        </Link>
      )}
      {isCurrentUserProfile && (
        <ResponsiveDialog
          title="Edit Profile"
          description="Edit your profile"
          isOpen={isEditProfileDialogOpen}
          setIsOpen={closeEditProfileDialog}
        >
          <UpdateProfileForm />
        </ResponsiveDialog>
      )}
    </div>
  );
};

export default Profile;
