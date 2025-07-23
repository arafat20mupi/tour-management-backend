import { model, Schema } from "mongoose";
import { IAuthProvider, IsActive,  UserRole } from "./user.interface";

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, { _id: false, versionKey: false });

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    phone: {
        type: String,
    },
    pictures: {
        type: String,
    },
    address: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: String,
        enum: Object.values(IsActive),
        default: IsActive.ACTIVE
    },
    isVarified: {
        type: Boolean,
        default: false
    },
    auth: {
        type: [authProviderSchema]
    }
    // booking: { 
    //     type: [Schema.Types.ObjectId], 
    //     ref: "Booking" 
    // },
    // guides: { 
    //     type: [Schema.Types.ObjectId], 
    //     ref: "Guide" 
    // }
});

const User = model("User", userSchema);

export default User;