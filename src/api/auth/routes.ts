import { Router } from "express";
import * as authController from "./controller";
import { validateSignupFields } from "./middlewares";

const authRoutes = Router();

authRoutes.post("/login", authController.login);

authRoutes.post("/register", validateSignupFields, authController.signup);

export default authRoutes;
