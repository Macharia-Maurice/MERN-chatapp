import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schema/RegisterSchema";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (data) => {
        const {
            first_name,
            last_name,
            email,
            password,
            confirm_password
        } = data

        try {
            setIsLoading(true);
            setError(null);
            const response = await axios.post('http://localhost:2000/api/auth/register', {
                first_name,
                last_name,
                email,
                password,
                confirm_password
            })
            console.log(response.data)
            navigate('/dashboard')

        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || 'Registration failed');

        } finally {

            setIsLoading(false)
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