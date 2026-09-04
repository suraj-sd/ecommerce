import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import {
  registerUser,
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";

export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);

  const result = await registerUser(data.name, data.email, data.password);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
};

export const login = async (req: Request, res: Response) => {
  const data = loginSchema.parse(req.body);

  const result = await loginUser(data.email, data.password);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result,
  });
};

export const me = async (req: Request, res: Response) => {
  const user = await getCurrentUser(req.user!.userId);

  res.status(200).json({
    success: true,
    data: user,
  });
};
