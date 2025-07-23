
import { IAuthProvider, IUser, UserRole } from "./user.interface"
import AppError from "../../errorHelpers/AppHelpers"
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import User from "./user.schema";

const createUser = async (payload: Partial<IUser>) => {
    const { email, password, ...rest } = payload;

    const isUserExist = await User.findOne({ email })

    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
    }

    const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

    const authProvider: IAuthProvider = { provider: "credentials", providerId: email as string }


    const user = await User.create({
        email,
        password: hashedPassword,
        auth: [authProvider],
        ...rest
    })

    return user

}


const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {

    const ifUserExist = await User.findById(userId)

    if (!ifUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not found")
    }

    if (payload.role) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.BAD_REQUEST, "You are not authorize")
        }

        if (payload.role === UserRole.SUPER_ADMIN && decodedToken.role === UserRole.ADMIN) {
            throw new AppError(httpStatus.BAD_REQUEST, "You are not authorize")
        }

    }

    if (payload.isActive || payload.isDeleted || payload.isVarified) {
        if (decodedToken.role === UserRole.USER || decodedToken.role === UserRole.GUIDE) {
            throw new AppError(httpStatus.FORBIDDEN, "You are not authorize")
        }
    }

    if (payload.password) {
        payload.password = await bcryptjs.hash(payload.password as string, Number(envVars.BCRYPT_SALT_ROUND))
    }

    const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
        new: true, runValidators: true
    })

    return newUpdatedUser

}


export const UserServices = {
    createUser,
    updateUser
}