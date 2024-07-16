import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userProfileSchema } from "@/schema/userProfileShema";
import { useUpdateProfileMutation } from "@/redux/features/profile/profileApiSlice";

const useUpdateProfile = ()=>{
    const form = useForm({
        resolver:zodResolver(userProfileSchema),
        defaultValues: {
            bio:"",

        },
    });

    const [ profile, {isLoading,error}] = useUpdateProfileMutation()

    const onSubmit = async (data) =>{
        const { bio } = data;
        const response = await profile({ bio }).unwrap()

        try{

        }catch(err){
            console.error("Update profile error:", err)
            console.log(error)
        }
    };

    return{
        handleSubmit : form.handleSubmit(onSubmit),
        form,
        isLoading,
        error
    };
}

export default useUpdateProfile;

