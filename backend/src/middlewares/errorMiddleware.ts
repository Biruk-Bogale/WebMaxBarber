// src/middlewares/errorMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError.js';
import config from '../config/config.js'; // environment config
import logger from '../config/logger.js'; //  winston

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorMiddleware = (err: Error, req: Request, res: Response, _next: NextFunction) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    error = new ApiError(500, error.message || 'Internal Server Error', false, null, error.stack);
  }

  const apiError = error as ApiError;

  if (config.env === 'development') {
    logger.error(apiError);
  }

  logger.error(`Error ${req.method} ${req.url} - ${apiError.message}`);

  return res.status(apiError.statusCode).json({
    error: true,
    message: apiError.message,
    ...(apiError.details && { details: apiError.details }),
    ...(config.env === 'development' && { stack: apiError.stack }),
  });
};
