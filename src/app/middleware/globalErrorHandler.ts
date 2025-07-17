/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";


export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json(
        {
            success: false,
            message: `Error ${err.message}`,
            err,
            stack: process.env.NODE_ENV === "development" ? err.stack : null
        }
    )
}