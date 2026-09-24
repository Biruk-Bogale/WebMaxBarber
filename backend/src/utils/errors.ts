import { ApiError } from './ApiError.js';

// Not Found Error
export class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(404, message);
  }
}

// validation Error (use for Joi/zod/react-hook-form validation errors)
export class ValidationError extends ApiError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message = 'Invalid request data', details?: any) {
    super(400, message, true, details);
  }
}

// Authentication error
export class AuthError extends ApiError {
  constructor(message = 'Unauthorized') {
    super(401, message);
  }
}

// Forbidden Error (For Insufficient Permissions)
export class ForbiddenError extends ApiError {
  constructor(message = 'Forbidden access') {
    super(403, message);
  }
}

// Database error (For MongoDB/Postgres Errors)
export class DatabaseError extends ApiError {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message = 'Database error', details?: any) {
    super(500, message, true, details);
  }
}

// Conflict Error (Use for "Already exists" or state conflicts like "Already verified")
export class ConflictError extends ApiError {
  constructor(message = 'Resource already exists or conflict occurred') {
    super(409, message);
  }
}

// RateLimit error (If user exceeds api limits)
export class RateLimitError extends ApiError {
  constructor(message = 'Too many requests, please try again later') {
    super(429, message);
  }
}
