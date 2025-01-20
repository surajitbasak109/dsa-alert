import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from '@utilities/http-status-codes';
import { z, ZodError } from 'zod';
import { sendErrorResponse } from '@utilities/response';
export function validateData(schema: z.ZodObject<any, any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof ZodError) {
                const errorMessages = error.errors.reduce((obj: any, issue: any) => {
                    obj[issue.path] = `${issue.path.join('.')} is ${issue.message}`
                    return obj;
                }, {});
                sendErrorResponse(res, errorMessages, StatusCodes.UNPROCESSABLE_ENTITY, "Validation error");
            } else {
                sendErrorResponse(res, [], StatusCodes.INTERNAL_SERVER_ERROR, "Internal Server Error");
            }
        }
    }
}
