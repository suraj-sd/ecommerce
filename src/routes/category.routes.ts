import { Router } from "express";
import {
  create,
  list,
  update,
  remove,
} from "../controllers/category.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/role.middleware.js";

const router = Router();

router.get("/", list);

router.post("/", authenticate, authorize("ADMIN"), create);

router.put("/:id", authenticate, authorize("ADMIN"), update);

router.delete("/:id", authenticate, authorize("ADMIN"), remove);

export default router;
