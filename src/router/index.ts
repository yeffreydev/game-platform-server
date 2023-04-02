import { Router } from "express";
import authRoutes from "../api/auth/routes";
import paintRoutes from "../api/paint/routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/paint", paintRoutes);

export default router;
