import { Response } from 'express';

export function sendSuccessResponse(
  res: Response,
  data: unknown,
  code = 200,
  message = 'Success'
) {
  return res
    .json({
      data,
      code,
      message,
      timestamp: new Date()
    })
    .status(code);
}

export function sendErrorResponse(
  res: Response,
  error: unknown[] | string | unknown = [],
  code = 500,
  message = 'Error'
) {
  return res
    .json({
      error,
      code,
      message,
      timestamp: new Date()
    })
    .status(code);
}
