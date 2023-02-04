import { Router } from "express";
import * as authController from "./controller";

const authRoutes = Router();

authRoutes.post("/login", authController.login);

authRoutes.post("/signup", authController.signup);

export default authRoutes;
