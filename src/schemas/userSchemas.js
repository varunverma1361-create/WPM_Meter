import {z} from "zod";

export const signupSchema = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email"),
    password: z.string().min(4, "Password must be atleast 4 characters")
})

export const loginSchema = z.object({
    email: z.string().trim().email("Invalid email"),
    password: z.string().min(1, "Password is required")
})