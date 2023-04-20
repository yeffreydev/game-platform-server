import { Router } from "express";
import { protect } from "../../middleware/protect";
import * as paintController from "./controller";

//image uploader
import { uploadPaintAndUpdate, uploadPaints } from "../../middleware/multerUpload";
import { verifyPaintOwnership } from "./middleware";

const paintRoutes = Router();

// create paint
paintRoutes.post("/", protect, uploadPaints.single("imageFile"), paintController.createPaint);

// get paint by user
paintRoutes.get("/by-user", protect, paintController.getPaintsByUser);

// get paint by id
paintRoutes.get("/:id", protect, paintController.getPaintById);

// update paint by id
paintRoutes.put("/:id", protect, paintController.updatePaintById);

// delete paint by id
paintRoutes.delete("/:id", protect, verifyPaintOwnership, paintController.deletePaintById);

//save paint
paintRoutes.post("/save/:id", protect, verifyPaintOwnership, uploadPaintAndUpdate.single("imageFile"), paintController.savePaint);

export default paintRoutes;
