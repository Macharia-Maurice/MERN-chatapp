import useUpdateProfile from "@/hooks/UpdateProfileHook";
import FormInput from "../wrappers/FormInput";
import ProfileForm from "../wrappers/profileForm";

const UpdateProfileForm = () =>{
    return(
        <ProfileForm
        title={"Edit Profile"}
        submitBtnTxt={"save"}
        hook={useUpdateProfile}
        >
            <FormInput
                name={"bio"}
                label={"Bio"}
                type={"text"}
            />

        </ProfileForm>
    )
}

export default UpdateProfileForm