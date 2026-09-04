import { prisma } from "../config/database.js";
import { ApiError } from "../utils/api-error.js";

interface OrderItemInput {
  productId: number;
  quantity: number;
}

export const createOrder = async (userId: number, items: OrderItemInput[]) => {
  return prisma.$transaction(async (tx) => {
    const productIds = items.map((item) => item.productId);

    const products = await tx.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });

    if (products.length !== productIds.length) {
      throw new ApiError(400, "One or more products do not exist");
    }

    let totalAmount = 0;

    const orderItems = items.map((item) => {
      const product = products.find((p) => p.id === item.productId);

      if (!product) {
        throw new ApiError(400, "Product not found");
      }

      if (product.stock < item.quantity) {
        throw new ApiError(400, `Insufficient stock for ${product.name}`);
      }

      const price = Number(product.price);

      totalAmount += price * item.quantity;

      return {
        productId: product.id,
        quantity: item.quantity,
        price,
      };
    });

    const order = await tx.order.create({
      data: {
        userId,
        totalAmount,
        items: {
          create: orderItems,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    for (const item of items) {
      await tx.product.update({
        where: {
          id: item.productId,
        },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    return order;
  });
};

export const getUserOrders = async (userId: number) => {
  return prisma.order.findMany({
    where: {
      userId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getOrderById = async (
  orderId: number,
  userId: number,
  role: "USER" | "ADMIN",
) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (role !== "ADMIN" && order.userId !== userId) {
    throw new ApiError(403, "You are not authorized to view this order");
  }

  return order;
};

export const updateOrderStatus = async (
  orderId: number,
  status:
    | "PENDING"
    | "CONFIRMED"
    | "PROCESSING"
    | "SHIPPED"
    | "DELIVERED"
    | "CANCELLED",
) => {
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  return prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
};
