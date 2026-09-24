/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';
import sanitizeHtml, { IOptions } from 'sanitize-html';
import he from 'he';

/**
 * IMPORTANT:
 * We strip HTML tags but DO NOT encode characters.
 * sanitize-html escapes entities by default (& -> &amp;)
 * so we decode back using `he.decode`
 */

const SANITIZE_OPTIONS: IOptions = {
  allowedTags: [],
  allowedAttributes: {},

  // Prevent parser from aggressively modifying text
  parser: {
    decodeEntities: false,
  },

  // Return text exactly as user wrote it
  textFilter(text) {
    return text;
  },
};

/**
 * Clean a string WITHOUT encoding entities
 */
const cleanString = (value: string): string => {
  const stripped = sanitizeHtml(value, SANITIZE_OPTIONS);
  return he.decode(stripped);
};

// --- FUNCTION 1: PURE (Returns a new value) ---
/**
 * Recursively sanitizes an object, array, or string.
 * @param obj - The item to sanitize.
 * @returns A new, sanitized version of the item.
 */

// Recursive sanitizer function
const sanitizeObject = (obj: any): any => {
  // STRING
  if (typeof obj === 'string') {
    return cleanString(obj);
  }

  // ARRAY
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }

  // OBJECT
  if (obj && typeof obj === 'object') {
    const sanitized: Record<string, any> = {};

    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        sanitized[key] = sanitizeObject(obj[key]);
      }
    }

    return sanitized;
  }

  // number | boolean | null | undefined
  return obj;
};

// --- FUNCTION 2: MUTATING (Changes the object) ---
/**
 * Recursively sanitizes an object or array IN-PLACE (by mutation).
 * This is required for read-only properties like req.query and req.params.
 * @param obj - The object/array to mutate.
 */

const sanitizeObjectInPlace = (obj: any): void => {
  if (!obj || typeof obj !== 'object') return;

  // ARRAY
  if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      if (typeof item === 'string') {
        obj[index] = cleanString(item);
      } else {
        sanitizeObjectInPlace(item);
      }
    });
    return;
  }

  // OBJECT
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    const value = obj[key];

    if (typeof value === 'string') {
      obj[key] = cleanString(value);
    } else {
      sanitizeObjectInPlace(value);
    }
  }
};

// --- THE MIDDLEWARE ---
/**
 * Express middleware to sanitize all user inputs.
 */

export const sanitizeAllMiddleware = (req: Request, _res: Response, next: NextFunction) => {
  // body can be replaced
  if (req.body) {
    req.body = sanitizeObject(req.body);
  }

  // query & params must be mutated
  sanitizeObjectInPlace(req.query);
  sanitizeObjectInPlace(req.params);

  next();
};
