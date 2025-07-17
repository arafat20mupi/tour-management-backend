import z from "zod";
import { IsActive, UserRole } from "./user.interface";

export const createZodSchema = z.object(
    {
        name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too Short. minimum 2 Charectar" }).max(50, { message: "Name too long" }),
        email: z.string().email(),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                { message: "Password must contain uppercase, lowercase, number, and special character" }
            ),
        phone: z.string().regex(/^\+88\d{11}$/, { message: "Phone must start with +88 and have 11 digits after country code" }).optional(),
        address: z.string({ invalid_type_error: "Address must be a string" })
            .max(200, { message: "Address must be at most 200 characters" })
            .optional(),

    }
)


export const updateZodSchema = z.object(
    {
        name: z.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too Short. minimum 2 Charectar" }).max(50, { message: "Name too long" }).optional(),
        password: z.string()
            .min(8, { message: "Password must be at least 8 characters" })
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                { message: "Password must contain uppercase, lowercase, number, and special character" }
            ).optional(),
        phone: z.string().regex(/^\+88\d{11}$/, { message: "Phone must start with +88 and have 11 digits after country code" }).optional(),
        address: z.string({ invalid_type_error: "Address must be a string" })
            .max(200, { message: "Address must be at most 200 characters" })
            .optional(),
        role: z.enum(Object.values(UserRole) as [string]).optional(),
        isActive: z.enum(Object.values(IsActive) as [string]).optional(),
        isDeleted: z.boolean({ invalid_type_error: "IsDeleted must be true or false" })
            .optional(),
        isVerified: z.boolean({ invalid_type_error: "IsDeleted must be true or false" })
            .optional(),
    }
)

