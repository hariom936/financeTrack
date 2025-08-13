// src/middleware/auth.ts

import { Request, Response, NextFunction } from 'express';

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: any, res: Response, next: NextFunction) => {
    const role = req.user?.role;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
        responseCode: 403,
      });
    }

    next();
  };
}
