import AppError from "../../errorHelpers/AppHelpers"
import { IUser } from "../user/user.interface"
import User from "../user/user.schema"
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { genarateToken } from "../../utilis/jwt";

const creadentialLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload
    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not Exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string , isUserExist.password as string)

    if (!isPasswordMatched) {
         throw new AppError(httpStatus.BAD_REQUEST, "Incurrect password")
    }

    const jWtPayload = {
        email : isUserExist.email,
        userId: isUserExist._id,
        role : isUserExist.role
    }

    const accessToken = genarateToken(jWtPayload ,envVars.JWT_ACCESS_SECRET ,envVars.JWT_ACCESS_EXPIRES)

    return {
       accessToken
    }
}


export const AuthServices = {
    creadentialLogin
}