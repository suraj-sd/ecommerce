import { env } from "../config/env.js";

export const swaggerDocument = {
  openapi: "3.0.3",

  info: {
    title: "E-Commerce REST API",
    version: "1.0.0",
    description:
      "REST API for managing users, categories, products and orders.",
  },

  servers: [
    {
      url: env.API_BASE_URL,
      description:
        env.NODE_ENV === "production"
          ? "Production server"
          : "Development server",
    },
  ],

  tags: [
    {
      name: "Authentication",
      description: "User registration, login and authentication",
    },
    {
      name: "Categories",
      description: "Category management",
    },
    {
      name: "Products",
      description: "Product browsing and management",
    },
    {
      name: "Orders",
      description: "Order creation and management",
    },
  ],

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Enter JWT token",
      },
    },

    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            example: "john@example.com",
          },
          role: {
            type: "string",
            enum: ["USER", "ADMIN"],
            example: "USER",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Category: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "Electronics",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      Product: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          name: {
            type: "string",
            example: "iPhone 17",
          },
          description: {
            type: "string",
            example: "Latest Apple smartphone",
          },
          price: {
            type: "number",
            format: "double",
            example: 999.99,
          },
          stock: {
            type: "integer",
            example: 25,
          },
          categoryId: {
            type: "integer",
            example: 2,
          },
          category: {
            $ref: "#/components/schemas/Category",
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      OrderItem: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          productId: {
            type: "integer",
            example: 1,
          },
          quantity: {
            type: "integer",
            example: 2,
          },
          price: {
            type: "number",
            format: "double",
            example: 999.99,
          },
        },
      },

      Order: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1,
          },
          userId: {
            type: "integer",
            example: 1,
          },
          status: {
            type: "string",
            enum: [
              "PENDING",
              "CONFIRMED",
              "PROCESSING",
              "SHIPPED",
              "DELIVERED",
              "CANCELLED",
            ],
            example: "PENDING",
          },
          totalAmount: {
            type: "number",
            format: "double",
            example: 1999.98,
          },
          items: {
            type: "array",
            items: {
              $ref: "#/components/schemas/OrderItem",
            },
          },
          createdAt: {
            type: "string",
            format: "date-time",
          },
          updatedAt: {
            type: "string",
            format: "date-time",
          },
        },
      },

      RegisterRequest: {
        type: "object",
        required: ["name", "email", "password"],
        properties: {
          name: {
            type: "string",
            example: "John Doe",
          },
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "password123",
          },
        },
      },

      LoginRequest: {
        type: "object",
        required: ["email", "password"],
        properties: {
          email: {
            type: "string",
            format: "email",
            example: "john@example.com",
          },
          password: {
            type: "string",
            format: "password",
            example: "password123",
          },
        },
      },

      CategoryRequest: {
        type: "object",
        required: ["name"],
        properties: {
          name: {
            type: "string",
            example: "Electronics",
          },
        },
      },

      ProductRequest: {
        type: "object",
        required: ["name", "price", "stock", "categoryId"],
        properties: {
          name: {
            type: "string",
            example: "iPhone 17",
          },
          description: {
            type: "string",
            example: "Latest Apple smartphone",
          },
          price: {
            type: "number",
            example: 999.99,
          },
          stock: {
            type: "integer",
            example: 25,
          },
          categoryId: {
            type: "integer",
            example: 2,
          },
        },
      },

      OrderRequest: {
        type: "object",
        required: ["items"],
        properties: {
          items: {
            type: "array",
            minItems: 1,
            items: {
              type: "object",
              required: ["productId", "quantity"],
              properties: {
                productId: {
                  type: "integer",
                  example: 1,
                },
                quantity: {
                  type: "integer",
                  example: 2,
                },
              },
            },
          },
        },
      },

      OrderStatusRequest: {
        type: "object",
        required: ["status"],
        properties: {
          status: {
            type: "string",
            enum: [
              "PENDING",
              "CONFIRMED",
              "PROCESSING",
              "SHIPPED",
              "DELIVERED",
              "CANCELLED",
            ],
            example: "CONFIRMED",
          },
        },
      },

      Error: {
        type: "object",
        properties: {
          success: {
            type: "boolean",
            example: false,
          },
          message: {
            type: "string",
            example: "Something went wrong",
          },
        },
      },
    },
  },

  paths: {
    "/api/v1/auth/register": {
      post: {
        tags: ["Authentication"],
        summary: "Register a new user",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/RegisterRequest",
              },
            },
          },
        },

        responses: {
          201: {
            description: "User registered successfully",
          },
          400: {
            description: "Validation error",
          },
          409: {
            description: "Email already registered",
          },
        },
      },
    },

    "/api/v1/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Login user",

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Login successful",
          },
          401: {
            description: "Invalid email or password",
          },
        },
      },
    },

    "/api/v1/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get current logged-in user",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          200: {
            description: "Current user",
          },
          401: {
            description: "Authentication required",
          },
        },
      },
    },

    "/api/v1/categories": {
      get: {
        tags: ["Categories"],
        summary: "Get all categories",

        responses: {
          200: {
            description: "Categories retrieved successfully",
          },
        },
      },

      post: {
        tags: ["Categories"],
        summary: "Create category",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryRequest",
              },
            },
          },
        },

        responses: {
          201: {
            description: "Category created",
          },
          401: {
            description: "Authentication required",
          },
          403: {
            description: "Admin access required",
          },
        },
      },
    },

    "/api/v1/categories/{id}": {
      put: {
        tags: ["Categories"],
        summary: "Update category",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/CategoryRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Category updated",
          },
          404: {
            description: "Category not found",
          },
        },
      },

      delete: {
        tags: ["Categories"],
        summary: "Delete category",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Category deleted",
          },
          400: {
            description: "Category contains products",
          },
          404: {
            description: "Category not found",
          },
        },
      },
    },

    "/api/v1/products": {
      get: {
        tags: ["Products"],
        summary: "Get products",

        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
          },
          {
            name: "limit",
            in: "query",
            schema: {
              type: "integer",
              default: 10,
              maximum: 100,
            },
          },
          {
            name: "search",
            in: "query",
            schema: {
              type: "string",
            },
            example: "iPhone",
          },
          {
            name: "categoryId",
            in: "query",
            schema: {
              type: "integer",
            },
            example: 2,
          },
          {
            name: "minPrice",
            in: "query",
            schema: {
              type: "number",
            },
            example: 100,
          },
          {
            name: "maxPrice",
            in: "query",
            schema: {
              type: "number",
            },
            example: 1000,
          },
        ],

        responses: {
          200: {
            description: "Products retrieved successfully",
          },
        },
      },

      post: {
        tags: ["Products"],
        summary: "Create product",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductRequest",
              },
            },
          },
        },

        responses: {
          201: {
            description: "Product created",
          },
          401: {
            description: "Authentication required",
          },
          403: {
            description: "Admin access required",
          },
        },
      },
    },

    "/api/v1/products/{id}": {
      get: {
        tags: ["Products"],
        summary: "Get product by ID",

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Product retrieved successfully",
          },
          404: {
            description: "Product not found",
          },
        },
      },

      put: {
        tags: ["Products"],
        summary: "Update product",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ProductRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Product updated",
          },
          404: {
            description: "Product not found",
          },
        },
      },

      delete: {
        tags: ["Products"],
        summary: "Delete product",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Product deleted",
          },
          400: {
            description: "Product is already used in an order",
          },
          404: {
            description: "Product not found",
          },
        },
      },
    },

    "/api/v1/orders": {
      post: {
        tags: ["Orders"],
        summary: "Create order",

        security: [
          {
            bearerAuth: [],
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderRequest",
              },
            },
          },
        },

        responses: {
          201: {
            description: "Order created successfully",
          },
          400: {
            description: "Insufficient stock or invalid order",
          },
          401: {
            description: "Authentication required",
          },
        },
      },

      get: {
        tags: ["Orders"],
        summary: "Get current user's orders",

        security: [
          {
            bearerAuth: [],
          },
        ],

        responses: {
          200: {
            description: "Orders retrieved successfully",
          },
          401: {
            description: "Authentication required",
          },
        },
      },
    },

    "/api/v1/orders/{id}": {
      get: {
        tags: ["Orders"],
        summary: "Get order by ID",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        responses: {
          200: {
            description: "Order retrieved successfully",
          },
          403: {
            description: "Access denied",
          },
          404: {
            description: "Order not found",
          },
        },
      },
    },

    "/api/v1/orders/{id}/status": {
      patch: {
        tags: ["Orders"],
        summary: "Update order status",
        description: "Admin only",

        security: [
          {
            bearerAuth: [],
          },
        ],

        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: {
              type: "integer",
            },
            example: 1,
          },
        ],

        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/OrderStatusRequest",
              },
            },
          },
        },

        responses: {
          200: {
            description: "Order status updated",
          },
          401: {
            description: "Authentication required",
          },
          403: {
            description: "Admin access required",
          },
          404: {
            description: "Order not found",
          },
        },
      },
    },
  },
};
