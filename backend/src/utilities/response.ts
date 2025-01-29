import { Response } from 'express';

export function sendSuccessResponse(
  res: Response,
  data: unknown,
  code = 200,
  message = 'Success'
) {
  const status = true;
  return res.status(code).json({
    status,
    data,
    code,
    message,
    timestamp: new Date().toISOString()
  });
}

export function sendErrorResponse(
  res: Response,
  error: unknown[] | string | unknown = [],
  code = 500,
  message = 'Error'
) {
  const status = false;
  return res.status(code).json({
    status,
    error,
    code,
    message,
    timestamp: new Date().toISOString()
  });
}
