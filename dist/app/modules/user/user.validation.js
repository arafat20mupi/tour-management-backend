"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateZodSchema = exports.createZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
const user_interface_1 = require("./user.interface");
exports.createZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too Short. minimum 2 Charectar" }).max(50, { message: "Name too long" }),
    email: zod_1.default.string().email(),
    password: zod_1.default.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain uppercase, lowercase, number, and special character" }),
    phone: zod_1.default.string().regex(/^\+88\d{11}$/, { message: "Phone must start with +88 and have 11 digits after country code" }).optional(),
    address: zod_1.default.string({ invalid_type_error: "Address must be a string" })
        .max(200, { message: "Address must be at most 200 characters" })
        .optional(),
});
exports.updateZodSchema = zod_1.default.object({
    name: zod_1.default.string({ invalid_type_error: "Name must be string" }).min(2, { message: "Name too Short. minimum 2 Charectar" }).max(50, { message: "Name too long" }).optional(),
    password: zod_1.default.string()
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, { message: "Password must contain uppercase, lowercase, number, and special character" }).optional(),
    phone: zod_1.default.string().regex(/^\+88\d{11}$/, { message: "Phone must start with +88 and have 11 digits after country code" }).optional(),
    address: zod_1.default.string({ invalid_type_error: "Address must be a string" })
        .max(200, { message: "Address must be at most 200 characters" })
        .optional(),
    role: zod_1.default.enum(Object.values(user_interface_1.UserRole)).optional(),
    isActive: zod_1.default.enum(Object.values(user_interface_1.IsActive)).optional(),
    isDeleted: zod_1.default.boolean({ invalid_type_error: "IsDeleted must be true or false" })
        .optional(),
    isVerified: zod_1.default.boolean({ invalid_type_error: "IsDeleted must be true or false" })
        .optional(),
});
