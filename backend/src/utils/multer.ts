import { NextFunction, Request, Response } from 'express';
import multer, { MulterError } from 'multer';
import path from 'path';
import fs from 'fs';
import { ValidationError } from './errors.js';
import logger from '../config/logger.js';

/**
 * Creates a multer middleware for multiple files with dynamic path
 * and "all-or-nothing" behavior
 * @param uploadPath - relative folder path for storing files
 */

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
  'image/jpg',
  'application/gzip',
];

export const uploadDynamicMiddleware = (uploadPath: string, field: string) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const fullPath = path.join(process.cwd(), uploadPath);

      fs.mkdirSync(fullPath, { recursive: true }); // ensure folder exists
      cb(null, fullPath);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '~-~-~';
      cb(null, uniqueSuffix + file.originalname);
    },
  });

  const uploadedNames = new Set<string>();

  const uploadFile = multer({
    storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // 20 MB
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fileFilter(_req, file, cb: any) {
      //

      // Track duplicates
      if (uploadedNames.has(file.originalname)) {
        uploadedNames.clear();
        return cb(
          new ValidationError(`Duplicate file: ${file.originalname} is not allowed`),
          false,
        );
      }

      uploadedNames.add(file.originalname);

      if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        cb(new ValidationError('Please upload Excel, CSV, PDF, Word, or Image files'), false);
      } else {
        cb(null, true);
      }
    },
  });

  // Middleware for multiple files
  return (req: Request, res: Response, next: NextFunction) => {
    //

    // clean up file if something went wrong
    const cleanupFiles = async (files: Express.Multer.File[]) => {
      for (const file of files) {
        try {
          await fs.promises.unlink(file.path);
          logger.info(`🗑️ Deleted file: ${file.filename}`);
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
          if (err.code !== 'ENOENT') {
            logger.error(`❌ Error deleting file ${file.filename}:`, err);
          }
        }
      }
    };

    uploadFile.array(field, 10)(req, res, (err) => {
      const uploadedFiles = (req.files as Express.Multer.File[]) || [];

      if (err instanceof MulterError) {
        //

        // Remove uploaded files on error
        cleanupFiles(uploadedFiles);

        if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') {
          return next(new ValidationError('File size should not exceed 20 MB'));
        }
        return next(new ValidationError(err.message));
      } else if (err) {
        // Remove uploaded files on validation error
        cleanupFiles(uploadedFiles);

        return next(err);
      }

      // Success: all files uploaded
      uploadedNames.clear();
      next();
    });
  };
};
