import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error.js";

export const authorize =
  (...roles: Array<"USER" | "ADMIN">) =>
  (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
