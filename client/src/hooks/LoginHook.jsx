import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { useLoginMutation } from "@/redux/features/auth/authApiSlice";
import { setAuth } from "@/redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const form = useForm({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading, error }] = useLoginMutation();

    const onSubmit = async (data) => {
        const { email, password } = data;

        try {
            const response = await login({ email, password }).unwrap();
            
            // Check if response contains the access token
            if (response.accessToken) {

                dispatch(setAuth());
                navigate('/dashboard');
            } else {
                console.error("Login error: No access token in response", response);
            }
        } catch (err) {
            console.error("Login error:", err);
            console.log(error)
        }
    };

    return {
        handleSubmit: form.handleSubmit(onSubmit),
        form,
        isLoading,
        error
    };
};

export default useLogin;
