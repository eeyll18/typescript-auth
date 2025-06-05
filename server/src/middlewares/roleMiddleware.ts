import { Request, Response, NextFunction } from "express";

// protect sonra bu
export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.roles) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }
    const hasRole = req.user.roles.some((role) => allowedRoles.includes(role));
    if (hasRole) {
      next();
    } else {
      res
        .status(403)
        .json({ message: "Forbidden: You do not have the required role" });
    }
  };
};
