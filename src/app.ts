import express from "express";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";

import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import orderRoutes from "./routes/order.routes.js";
import swaggerUi from "swagger-ui-express";
import { swaggerDocument } from "./swagger/swagger.js";
import { notFound } from "./middleware/not-found.middleware.js";
import { errorHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(compression());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/products", productRoutes);

app.use("/api/v1/categories", categoryRoutes);

app.use("/api/v1/orders", orderRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;
