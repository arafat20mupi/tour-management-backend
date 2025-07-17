import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.services";

const creadentialLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const logInfo = await AuthServices.creadentialLogin(req.body)
        res.status(httpStatus.OK).json({
            message: "User Login Succesfully",
            data: logInfo,
            success: true
        });
    } catch (error) {
        next(error)
    }
};


export const AuthController = {
    creadentialLogin
}