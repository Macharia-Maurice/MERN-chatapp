import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schema/LoginSchema";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

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
            const response = await axios.post('http://localhost:2000/api/auth/login', { email, password });
            console.log(response.data)
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