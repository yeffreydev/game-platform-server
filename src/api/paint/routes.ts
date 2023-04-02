import { Router } from "express";
import * as paintController from "./controller";

const paintRoutes = Router();

// create paint
paintRoutes.post("/", paintController.createPaint);

// get paint by user
paintRoutes.get("/by-user/:userId", paintController.getPaintsByUser);

// get paint by id
paintRoutes.get("/:id", paintController.getPaintById);

// update paint by id
paintRoutes.put("/:id", paintController.updatePaintById);

// delete paint by id
paintRoutes.delete("/:id", paintController.deletePaintById);

export default paintRoutes;
