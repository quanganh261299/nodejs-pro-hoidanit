import { isEmailExist } from "services/client/auth.service";
import { z } from "zod";

const emailSchema = z.string().email('Email không đúng định dạng').refine(async (email) => {
    const existingUser = await isEmailExist(email)
    return !existingUser;
}, {
    message: "Email already exists",
    path: ["email"]
})

const passwordSchema = z.string().min(3, { message: "Password tối thiểu 3 ký tự" }).max(20, { message: "Password tối đa 20 ký tự" }).refine((password) => /[A-Z]/.test(password), {
    message: 'Password phải chứa ít nhất 1 kí tự viết hoa',
})
    .refine((password) => /[a-z]/.test(password), {
        message: 'Password phải chứa ít nhất 1 kí tự viết thường',
    })
    .refine((password) => /[0-9]/.test(password), { message: 'Password phải chứa ít nhất 1 kí tự số' })
    .refine((password) => /[!@#$%^&*]/.test(password), {
        message: 'Password phải chứa ít nhất 1 kí tự đặc biệt',
    });

export const RegisterSchema = z.object({
    fullName: z.string().trim().min(1, { message: "Tên không được để trống" }),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, { message: "Password confirm không chính xác", path: ['confirmPassword'] })

export type TRegisterSchema = z.infer<typeof RegisterSchema>