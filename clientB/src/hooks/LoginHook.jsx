import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from "../utils/axiosConfig";
import Cookies from "js-cookie";

const useLogin = () =>{
    const form = useForm({
        resolver:zodResolver(LoginSchema),
        defaultValues:{
            email:"",
            password:"",
        },
    });

    const navigate = useNavigate();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const handleSubmit = async (data) =>{
        const { email, password } = data;

        try{
            setIsLoading(true);
            setError(null);
            const response = await axios.post('/auth/login', { email, password });

            // set cookies
            Cookies.set('accessToken', response.data.accessToken, { expires: 1})
            Cookies.set('refreshToken', response.data.refreshToken, { expires: 7})

            navigate('/dashboard')

        }catch (err){
            console.error(err);
            setError(err.response?.data?.message || 'Login failed');

        }finally{

            setIsLoading(false)
        }
    };

    return{
        handleSubmit,
        form,
        isLoading,
        error
    };
}

export default useLogin;