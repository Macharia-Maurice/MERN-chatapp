import { Button } from "@/components/ui/button";
import UpdateProfileForm from "@/components/forms/UpdateProfileForm";
import useResponsiveDialog from "@/hooks/ResponsiveDialogHook";
import { ResponsiveDialog } from "@/components/wrappers/ResponsiveDialog";

const Profile = () => {
    const {
        isDialogOpen: isEditProfileDialogOpen,
        handleOpenDialog: openEditProfileDialog,
        handleCloseDialog: closeEditProfileDialog,
    } = useResponsiveDialog("editProfile");

    return (
        <div className="h-screen">
            <Button onClick={openEditProfileDialog}>
                Edit Profile
            </Button>

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