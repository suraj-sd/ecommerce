import { Request, Response } from "express";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validators/order.validator.js";
import {
  createOrder,
  getUserOrders,
  getOrderById,
  updateOrderStatus,
} from "../services/order.service.js";

export const create = async (req: Request, res: Response) => {
  const data = createOrderSchema.parse(req.body);

  const order = await createOrder(req.user!.userId, data.items);

  res.status(201).json({
    success: true,
    message: "Order created successfully",
    data: order,
  });
};

export const list = async (req: Request, res: Response) => {
  const orders = await getUserOrders(req.user!.userId);

  res.status(200).json({
    success: true,
    data: orders,
  });
};

export const getById = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const order = await getOrderById(orderId, req.user!.userId, req.user!.role);

  res.status(200).json({
    success: true,
    data: order,
  });
};

export const updateStatus = async (req: Request, res: Response) => {
  const orderId = Number(req.params.id);

  const data = updateOrderStatusSchema.parse(req.body);

  const order = await updateOrderStatus(orderId, data.status);

  res.status(200).json({
    success: true,
    message: "Order status updated successfully",
    data: order,
  });
};
