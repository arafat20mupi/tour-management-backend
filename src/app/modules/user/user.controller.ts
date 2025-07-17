import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import User from "./user.schema";
import AppError from "../../errorHelpers/AppHelpers";
import { IAuthProvider } from "./user.interface";
import bcryptjs from "bcryptjs"
import { envVars } from "../../config/env";
import { UserServices } from "./user.service";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, ...rest } = req.body;
        const isUserExist = await User.findOne({ email })

        if (isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist")
        }

        const hashedPassword = await bcryptjs.hash(password as string, Number(envVars.BCRYPT_SALT_ROUND))

        const authProvider: IAuthProvider = {
            provider: "credentials", providerId: email as string
        }

        const user = await User.create(
            {
                email,
                password: hashedPassword,
                auths: [authProvider],
                ...rest
            }
        );
        res.status(httpStatus.CREATED).json({
            message: "User created successfully",
            data: user
        });
    } catch (error) {
        next(error)
    }
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find()
        res.status(httpStatus.OK).json({ user });
    } catch (error) {
        next(error)
    }
}

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id

        const verifyToken = req.user
        const payload = req.body

        const user = UserServices.updateUser(userId, payload, verifyToken)

        res.status(httpStatus.CREATED).json({
            message: "User updated successfully",
            data: user
        });
    } catch (error) {
        next(error)
    }
}


export default {
    createUser,
    getUser,
    updateUser
};