import { Request, Response } from "express";
import {
  createProductSchema,
  updateProductSchema,
} from "../validators/product.validator.js";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

export const create = async (req: Request, res: Response) => {
  const data = createProductSchema.parse(req.body);

  const product = await createProduct(data);

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: product,
  });
};

export const list = async (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);

  const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

  const search =
    typeof req.query.search === "string" ? req.query.search : undefined;

  const categoryId =
    req.query.categoryId !== undefined
      ? Number(req.query.categoryId)
      : undefined;

  const minPrice =
    req.query.minPrice !== undefined ? Number(req.query.minPrice) : undefined;

  const maxPrice =
    req.query.maxPrice !== undefined ? Number(req.query.maxPrice) : undefined;

  const result = await getProducts({
    page,
    limit,
    ...(search !== undefined && { search }),
    ...(categoryId !== undefined && { categoryId }),
    ...(minPrice !== undefined && { minPrice }),
    ...(maxPrice !== undefined && { maxPrice }),
  });

  res.status(200).json({
    success: true,
    data: result,
  });
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const product = await getProductById(id);

  res.status(200).json({
    success: true,
    data: product,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const data = updateProductSchema.parse(req.body);

  const product = await updateProduct(id, {
    ...(data.name === undefined ? {} : { name: data.name }),
    ...(data.description === undefined
      ? {}
      : { description: data.description }),
    ...(data.price === undefined ? {} : { price: data.price }),
    ...(data.stock === undefined ? {} : { stock: data.stock }),
    ...(data.categoryId === undefined ? {} : { categoryId: data.categoryId }),
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await deleteProduct(id);

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
};
