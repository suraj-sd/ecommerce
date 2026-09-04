import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().trim().min(2).max(200),

  description: z.string().trim().max(2000).optional(),

  price: z.number().positive(),

  stock: z.number().int().nonnegative(),

  categoryId: z.number().int().positive(),
});

export const updateProductSchema = createProductSchema.partial();
