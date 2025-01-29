import type { Request, Response, NextFunction } from 'express'
export default function allowOrigin(req: Request, res: Response, next: NextFunction) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4000")
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PUT, DELETE, OPTIONS'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
    next();
}
