import { Response } from "express";
import z from 'zod';

export function handleErrorResp(status: number, res: Response, msg: string): Response {
    return res.status(status).send({
        status: "error",
        data: {},
        message: msg,
    })
}

export function handleOkResp(data: any, res: Response, msg?: string): Response {
    return res.send({
        status: "success",
        data: data,
        message: msg,
    })
}

export function handleValidationErrorResp(error: z.ZodError, res: Response): Response {
    console.log(error)
    return res.status(400).send({
        status: "error",
        message: `Validation error: ${error.issues.map(issue => issue.message).join(';')}`,
    })
}