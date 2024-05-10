import express from "express";
import { body } from "express-validator";
import { authController } from "../controllers/auth-controller";

export const router = express.Router();

router.get("/activate/:link", authController.activate);
router.get("/refresh", authController.refreshToken);
router.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 6, max: 32 }),
	authController.register
);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
