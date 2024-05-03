import express from "express";
import { todoController } from "../controllers/todo-controller";
import { authMiddleware } from "../middlewares/auth-middleware";

export const router = express.Router();

router.post("/", authMiddleware, todoController.createTodo);
router.get("/", authMiddleware, todoController.getAllTodos);
router.get("/:id", authMiddleware, todoController.getTodoById);
router.put("/:id", authMiddleware, todoController.editTodo);
router.delete("/:id", authMiddleware, todoController.deleteTodo);
