import { Types } from "mongoose";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN",
    GUIDE = "GUIDE",
    SUPER_ADMIN = "SUPER_ADMIN"
}

export interface IAuthProvider {
   provider: "google" | "credentials";
   providerId: string;
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    pictures?: string
    address?: string;
    isDeleted?: boolean;
    isActive?: IsActive;
    isVarified?: boolean;
    auth: IAuthProvider[];
    role: UserRole;
    booking?: Types.ObjectId[];
    guides?: Types.ObjectId[];
}
