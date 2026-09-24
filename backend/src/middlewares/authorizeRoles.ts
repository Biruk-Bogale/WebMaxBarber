/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Response } from 'express';
import { AuthError } from '../utils/errors.js';

export const isAdmin = (req: any, _res: Response, next: NextFunction) => {
  if (req.account.role !== 'Operator') {
    return next(new AuthError('Access denied: Admin only'));
  }
  next();
};

export const isCompany = (req: any, _res: Response, next: NextFunction) => {
  if (req.account.role !== 'Company') {
    return next(new AuthError('Access denied: Company only'));
  }
  next();
};

export const isAdminCompany = (req: any, _res: Response, next: NextFunction) => {
  if (req.role !== 'Company' && req.role !== 'Operator') {
    return next(new AuthError('Access denied: Company or Admin only'));
  }
  next();
};
