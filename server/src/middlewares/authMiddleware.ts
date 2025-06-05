import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwtHelper";
import { Types } from "mongoose";

// Express Request tipini genişletme

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: Types.ObjectId | string;
        roles: string[];
        email: string;
      };
    }
  }
}

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    const decoded = verifyAccessToken(token);
    if (decoded) {
      req.user = decoded;
      return next();
    }
  }
  res.status(401).json({ message: "Not authorized, token failed" });
};
