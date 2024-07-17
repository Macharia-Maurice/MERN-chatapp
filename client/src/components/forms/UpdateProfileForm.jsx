import FormWrapper from "../wrappers/FormWrapper";
import FormInput from "../wrappers/FormInput";
import useUpdateProfile from "@/hooks/UpdateProfileHook";


const UpdateProfileForm = () =>{
    return(
        <FormWrapper
        title={"Edit Profile"}
        submitBtnTxt={"save"}
        hook={useUpdateProfile}
        >
            <FormInput
                name={"profilePicture"}
                label={"Profile Picture"}
                type={"file"}
            />

            <FormInput
                name={"bio"}
                label={"Bio"}
                type={"text"}
            />

        </FormWrapper>
    )
}

export default UpdateProfileForm