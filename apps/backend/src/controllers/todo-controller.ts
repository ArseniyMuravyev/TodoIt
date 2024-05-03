import { ITodo } from "@arseniy/types";
import { Request, Response } from "express";
import { TodoModel } from "../models/todo-model";

class TodoController {
	async createTodo(req: Request, res: Response) {
		const userId = req.user.id;
		const newTodo = new TodoModel({
			title: req.body.title,
			date: req.body.date,
			completed: false,
			userId,
		});
		await newTodo.save();
		res.json(newTodo);
	}

	async deleteTodo(req: Request, res: Response) {
		await TodoModel.findByIdAndDelete(req.params.id);
		res.json({ message: "Todo successfully deleted" });
	}

	async editTodo(req: Request, res: Response) {
		const updatedTodo: ITodo | null = await TodoModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.json(updatedTodo);
	}

	async getAllTodos(req: Request, res: Response) {
		const userId = req.user.id;
		const todos: ITodo[] = await TodoModel.find({ userId });
		res.json(todos);
	}

	async getTodoById(req: Request, res: Response) {
		const todo: ITodo | null = await TodoModel.findById(req.params.id);
		res.json(todo);
	}
}

export const todoController = new TodoController();
