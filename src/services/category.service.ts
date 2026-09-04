import { prisma } from "../config/database.js";
import { ApiError } from "../utils/api-error.js";

export const createCategory = async (name: string) => {
  return prisma.category.create({
    data: { name },
  });
};

export const getCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          products: true,
        },
      },
    },
  });
};

export const updateCategory = async (id: number, name: string) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return prisma.category.update({
    where: { id },
    data: { name },
  });
};

export const deleteCategory = async (id: number) => {
  const category = await prisma.category.findUnique({
    where: { id },
  });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  const productCount = await prisma.product.count({
    where: { categoryId: id },
  });

  if (productCount > 0) {
    throw new ApiError(409, "Cannot delete category containing products");
  }

  await prisma.category.delete({
    where: { id },
  });
};
