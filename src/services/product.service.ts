import { prisma } from "../config/database.js";
import { ApiError } from "../utils/api-error.js";

interface ProductFilters {
  page: number;
  limit: number;
  search?: string;
  categoryId?: number;
  minPrice?: number;
  maxPrice?: number;
}

export const createProduct = async (data: {
  name: string;
  description?: string | undefined;
  price: number;
  stock: number;
  categoryId: number;
}) => {
  return prisma.product.create({
    data: {
      name: data.name,
      ...(data.description !== undefined && {
        description: data.description,
      }),
      price: data.price,
      stock: data.stock,
      categoryId: data.categoryId,
    },
  });
};

export const getProducts = async (filters: ProductFilters) => {
  const { page, limit, search, categoryId, minPrice, maxPrice } = filters;

  const skip = (page - 1) * limit;

  const where = {
    ...(search
      ? {
          name: {
            contains: search,
            mode: "insensitive" as const,
          },
        }
      : {}),

    ...(categoryId ? { categoryId } : {}),

    ...(minPrice !== undefined || maxPrice !== undefined
      ? {
          price: {
            ...(minPrice !== undefined ? { gte: minPrice } : {}),
            ...(maxPrice !== undefined ? { lte: maxPrice } : {}),
          },
        }
      : {}),
  };

  const [products, total] = await prisma.$transaction([
    prisma.product.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
      include: {
        category: true,
      },
    }),

    prisma.product.count({
      where,
    }),
  ]);

  return {
    products,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getProductById = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  return product;
};

export const updateProduct = async (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    categoryId?: number;
  },
) => {
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (data.categoryId !== undefined) {
    const category = await prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category) {
      throw new ApiError(400, "Category does not exist");
    }
  }

  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
    },
  });
};

export const deleteProduct = async (id: number) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      orderItems: true,
    },
  });

  if (!product) {
    throw new ApiError(404, "Product not found");
  }

  if (product.orderItems.length > 0) {
    throw new ApiError(409, "Cannot delete a product used in an order");
  }

  await prisma.product.delete({
    where: { id },
  });
};
