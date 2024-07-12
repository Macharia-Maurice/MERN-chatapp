import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "@/redux/features/auth/authApiSlice";
const useRegister = () => {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            confirm_password: ""
        },
    });

    const navigate = useNavigate();
    const [register, { isLoading, error }] = useRegistrationMutation();

    const handleSubmit = async (data) => {
        const {
            first_name,
            last_name,
            email,
            password,
            confirm_password
        } = data

        try {
            // const response = await axios.post('auth/register', {
            //     first_name,
            //     last_name,
            //     email,
            //     password,
            //     confirm_password
            // })

            const response = await register({
                first_name,
                last_name,
                email,
                password,
                confirm_password
            }).unwrap();

            console.log(response.data);
            navigate('/login')

        } catch (err) {
            console.error(err);

        }
    };

    return {
        handleSubmit,
        form,
        isLoading,
        error

    };
};

export default useRegister;