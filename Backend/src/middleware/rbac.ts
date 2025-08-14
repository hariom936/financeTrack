import { Request, Response, NextFunction } from 'express';

export function authorizeRoles(...allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = (req as any).user?.role;

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({
        message: 'Access denied. Insufficient permissions.',
        responseCode: 403,
      });
    }
    next();
  };
}
