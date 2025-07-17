import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken"
import httpStatus from "http-status-codes";
import { verifiedToken } from "../utilis/jwt";
import AppError from "../errorHelpers/AppHelpers";
import { envVars } from "../config/env";

export const checkAuth = (...authRoles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization


        if (!accessToken) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Token Recieved")
        }
        const verifyToken = verifiedToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload

        if (!authRoles.includes(verifyToken.role)) {
            console.log(authRoles.includes(verifyToken.role));
            throw new AppError(httpStatus.BAD_REQUEST, "You are not promoted in this user")
        }

        req.user = verifyToken

        next()
    } catch (error) {
        next(error)
    }
}
