import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/api-error.js";
import { verifyToken } from "../utils/jwt.js";

export const authenticate = (
  req: Request,
  _res: Response,
  next: NextFunction,
): void => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return next(new ApiError(401, "Authentication required"));
  }

  const [scheme, token] = authorization.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new ApiError(401, "Invalid authorization header"));
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch {
    next(new ApiError(401, "Invalid or expired token"));
  }
};
