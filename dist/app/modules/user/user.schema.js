"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const user_interface_1 = require("./user.interface");
const authProviderSchema = new mongoose_1.Schema({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, { _id: false, versionKey: false });
const userSchema = new mongoose_1.Schema({
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
        enum: Object.values(user_interface_1.UserRole),
        default: user_interface_1.UserRole.USER
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
        enum: Object.values(user_interface_1.IsActive),
        default: user_interface_1.IsActive.ACTIVE
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
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
