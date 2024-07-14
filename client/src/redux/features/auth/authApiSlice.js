import { baseApi } from "@/redux/baseApiSlice";

const authApiSlice = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({


        registration: builder.mutation({
            query: ({
                first_name,
                last_name,
                email,
                password,
                confirm_password,
            }) => ({
                url: "/auth/register",
                method: "POST",
                body: { first_name, last_name, email, password, confirm_password },
            }),
        }),


        login: builder.mutation({
            query: ({ email, password})=>({
                url:"/auth/login",
                method:"POST",
                body: { email, password},
            }),
        }),


        logout: builder.mutation({
            query: () =>({
                url:"/auth/logout",
                method:"POST",
            }),
        }),


    }),
});

export const {
    useRegistrationMutation,
    useLoginMutation,
    useLogoutMutation,
} = authApiSlice;