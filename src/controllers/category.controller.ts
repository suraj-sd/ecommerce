import { Request, Response } from "express";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validators/category.validator.js";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../services/category.service.js";

export const create = async (req: Request, res: Response) => {
  const data = createCategorySchema.parse(req.body);

  const category = await createCategory(data.name);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: category,
  });
};

export const list = async (_req: Request, res: Response) => {
  const categories = await getCategories();

  res.status(200).json({
    success: true,
    data: categories,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const data = updateCategorySchema.parse(req.body);

  const category = await updateCategory(id, data.name);

  res.status(200).json({
    success: true,
    message: "Category updated successfully",
    data: category,
  });
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteCategory(id);

  res.status(200).json({
    success: true,
    message: "Category deleted successfully",
  });
};
