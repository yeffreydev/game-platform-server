import { Router } from "express";
import { protect } from "../../middleware/protect";
import * as paintController from "./controller";

const paintRoutes = Router();

// create paint
paintRoutes.post("/", protect, paintController.createPaint);

// get paint by user
paintRoutes.get("/by-user/:userId", protect, paintController.getPaintsByUser);

// get paint by id
paintRoutes.get("/:id", protect, paintController.getPaintById);

// update paint by id
paintRoutes.put("/:id", protect, paintController.updatePaintById);

// delete paint by id
paintRoutes.delete("/:id", protect, paintController.deletePaintById);

export default paintRoutes;
