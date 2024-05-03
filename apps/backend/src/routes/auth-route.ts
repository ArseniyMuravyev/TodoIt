import express from "express";
import { body } from "express-validator";
import { userController } from "../controllers/user-controller";

export const router = express.Router();

router.get("/", userController.getAllUsers);
router.post(
	"/register",
	body("email").isEmail(),
	body("password").isLength({ min: 6, max: 32 }),
	userController.register
);
router.get("/activate/:link", userController.activate);
router.post("/login", userController.login);
router.put("/user/:id", userController.updateUser);
router.post("/logout", userController.logout);
router.post("/forgot-password", userController.forgotPassword);
router.post("/reset-password", userController.resetPassword);
router.get("/refresh", userController.refreshToken);
router.delete("/user/:id", userController.deleteUser);
