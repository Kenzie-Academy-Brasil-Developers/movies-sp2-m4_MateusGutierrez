import { NextFunction, Request, Response } from "express";
import { AppError, NotFound } from "../error";

export const handleError = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
): Response => {
    if(error instanceof AppError){
        return res.status(error.statusCode).json({message: error.message})
    }
    if(error instanceof NotFound){
        return res.status(404).json({message: error.message})
    }
    console.error(error)
    return res.status(500).json({message: "Internal Server Error."})
}