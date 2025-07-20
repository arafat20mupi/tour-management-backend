/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from "../../errorHelpers/AppHelpers"
import { IUser } from "../user/user.interface"
import User from "../user/user.schema"
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import { createNewAccessTokenWithRefreshToken, createUserToken } from "../../utilis/userToken";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const creadentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload
    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incurrect password")
    }


    const userToken = createUserToken(isUserExist as object)


    const { password: pass, ...rest } = isUserExist.toObject()
    return {
        accessToken: userToken.accessToken,
        refreshToken: userToken.refreshToken,
        user: rest
    }
}

const getNewAccessToken = async (refreshToken: string) => {
    const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)

    return {
        accessToken: newAccessToken
    }

}

const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

    const user = await User.findById(decodedToken.userId)

    const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
    if (!isOldPasswordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
    }

    user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

    user!.save();


}


export const AuthServices = {
    creadentialLogin,
    getNewAccessToken,
    resetPassword
}