import express from "express";
import { userController } from "../controllers/user-controller";

export const router = express.Router();

router.post("/:id/avatar", userController.uploadAvatar);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.updateUser);
router.delete("/:id/avatar", userController.deleteAvatar);
