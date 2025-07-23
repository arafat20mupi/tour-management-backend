/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { AuthServices } from "./auth.services";
import AppError from "../../errorHelpers/AppHelpers";
import { setAuthCookie } from "../../utilis/setCookie";
import { catchAsync } from "../../utilis/catchAsync";
import { createUserToken } from "../../utilis/userToken";
import { envVars } from "../../config/env";
import { sendResponse } from "../../utilis/sendResponse";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";


const creadentialLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    passport.authenticate("local", async (err: any, user: any, info: any) => {

        if (err) {
            return next(new AppError(401, err))
        }

        if (!user) {
            return next(new AppError(401, info.message))
        }

        const userTokens = await createUserToken(user)

        const { password: pass, ...rest } = user.toObject()


        setAuthCookie(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                refreshToken: userTokens.refreshToken,
                user: rest

            },
        })
    })(req, res, next)

})

const getNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            throw new AppError(httpStatus.BAD_REQUEST, "No refresh token recieved from cookies")
        }
        const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

        setAuthCookie(res, tokenInfo);

        res.status(httpStatus.OK).json({
            message: "New Access Token Generated Successfully",
            data: tokenInfo,
            success: true
        });
    } catch (error) {
        next(error)
    }
};

const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        });

        res.status(httpStatus.OK).json({
            message: "User Logout Succesfully",
            data: null,
            success: true
        });
    } catch (error) {
        next(error)
    }
};

const resetPassword = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;
    const decodedToken = req.user

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken as JwtPayload);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Password Changed Successfully",
        data: null,
    })
})
const googleCallbackController = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    let redirectTo = req.query.state ? req.query.state as string : ""

    if (redirectTo.startsWith("/")) {
        redirectTo = redirectTo.slice(1)
    }

    const user = req.user;

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User Not Found")
    }

    const tokenInfo = createUserToken(user)

    setAuthCookie(res, tokenInfo)

    res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`)
})

export const AuthController = {
    creadentialLogin,
    getNewAccessToken,
    logout,
    resetPassword,
    googleCallbackController
}