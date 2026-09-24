// src/utils/ApiError.ts
export class ApiError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readonly details?: any;

  constructor(
    statusCode: number,
    message: string,
    isOperational = true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    details?: any,
    stack = '',
  ) {
    super(message);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
