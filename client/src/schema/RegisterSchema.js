import * as z from 'zod'

export const RegisterSchema = z.object({
    first_name: z.string().min(2).max(20, {
        message: "Please enter your first name"
    }),
    last_name: z.string().min(2).max(20, {
        message: "Please enter your last name"
    }),
    email: z.string().email({
        message: "Please enter a valid email address"
    }),
    password: z.string().min(6).max(100, {
        message: "Password must be at least 6 characters long"
    }),
    re_password: z.string().min(6).max(100, {
        message: "Password must be at least 6 characters long"
    })
}).refine(data => data.password === data.re_password, {
    message: "Passwords do not match",
    path: ["re_password"],
});