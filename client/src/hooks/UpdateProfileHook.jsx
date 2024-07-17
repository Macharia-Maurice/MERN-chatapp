// useUpdateProfile.js
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileSchema } from "@/schema/ProfileShema";
import { useUpdateProfileMutation, useUpdateProfilePictureMutation } from "@/redux/features/profile/profileApiSlice";

const useUpdateProfile = () => {
  const form = useForm({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      bio: "",
      profilePicture: null,
    },
  });

  const [updateProfile, { isLoading: isUpdatingProfile, error: updateProfileError }] = useUpdateProfileMutation();
  const [updateProfilePicture, { isLoading: isUpdatingPicture, error: updatePictureError }] = useUpdateProfilePictureMutation();

  const onSubmit = async (data) => {
    const { bio, profilePicture } = data;
    try {
      if (bio) {
        await updateProfile({ bio }).unwrap();
      }
      if (profilePicture.length > 0) {
        await updateProfilePicture({ profilePicture: profilePicture[0] }).unwrap();
      }
    } catch (err) {
      console.error("Update profile error:", err);
    }
  };

  return {
    handleSubmit: form.handleSubmit(onSubmit),
    form,
    isLoading: isUpdatingProfile || isUpdatingPicture,
    error: updateProfileError || updatePictureError,
  };
};

export default useUpdateProfile;
