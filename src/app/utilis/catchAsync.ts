import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

/* eslint-disable @typescript-eslint/no-explicit-any */
type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export const catchAsync = (fn: AsyncHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
        if (envVars.NODE_ENV === "development") {
            console.error("Error caught in catchAsync:", err);


        }
        next(err)
    })
}