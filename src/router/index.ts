import { Router } from "express";
import authRoutes from "../api/auth/routes";

const router = Router();

router.use("/auth", authRoutes);

export default router;
