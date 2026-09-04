import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/api-error.js";

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  console.error(error);

  if (error instanceof ZodError) {
    res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: error.flatten().fieldErrors,
    });

    return;
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      res.status(409).json({
        success: false,
        message: "A record with this value already exists",
      });

      return;
    }

    if (error.code === "P2025") {
      res.status(404).json({
        success: false,
        message: "Record not found",
      });

      return;
    }
  }

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });

    return;
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
