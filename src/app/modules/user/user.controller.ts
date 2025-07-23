import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import User from "./user.schema";
import { UserServices } from "./user.service";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utilis/catchAsync";
import { sendResponse } from "../../utilis/sendResponse";

const createUser = catchAsync(async (req: Request, res: Response) => {
    const user = await UserServices.createUser(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User Created Successfully",
        data: user,
    })
})

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

        const verifyToken = req.user as JwtPayload
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