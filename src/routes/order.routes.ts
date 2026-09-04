import { Router } from "express";
import {
  create,
  list,
  getById,
  updateStatus,
} from "../controllers/order.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", create);

router.get("/", list);

router.get("/:id", getById);

router.patch("/:id/status", authorize("ADMIN"), updateStatus);

export default router;
