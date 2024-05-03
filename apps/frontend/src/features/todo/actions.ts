import { ITodo } from "@arseniy/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/api";

interface UpdateTodoArgs {
	_id: string;
	newTitle: string;
}

interface CreateTodoArgs {
	title: string;
	date: Date | null;
}

export const fetchTodos = createAsyncThunk("todo/fetchTodos", async () => {
	const response = await api.get(`todos`);
	return response.data;
});

export const removeTodo = createAsyncThunk(
	"todo/removeTodo",
	async (_id: string) => {
		await api.delete(`todos/${_id}`);
		return _id;
	}
);

export const completeTodo = createAsyncThunk(
	"todo/completeTodo",
	async (todo: ITodo) => {
		const updatedTodo = { ...todo, completed: !todo.completed };
		const response = await api.put(`todos/${todo._id}`, updatedTodo);
		return response.data;
	}
);

export const createTodo = createAsyncThunk(
	"todo/createTodo",
	async ({ title, date }: CreateTodoArgs) => {
		const response = await api.post("todos", { title, date });
		return response.data;
	}
);

export const getTodoById = createAsyncThunk(
	"todo/getTodoById",
	async (_id: string) => {
		const response = await api.get(`todos/${_id}`);
		return response.data;
	}
);

export const updateTodo = createAsyncThunk(
	"todo/updateTodo",
	async ({ _id, newTitle }: UpdateTodoArgs) => {
		const response = await api.put(`todos/${_id}`, {
			title: newTitle,
		});
		return response.data;
	}
);
