import { ITodo } from "@arseniy/types";

export const formatDate = (isoDateString: string) => {
	const date = new Date(isoDateString);
	const day = date.getDate().toString().padStart(2, "0");
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const year = date.getFullYear();
	return `${day}.${month}.${year}`;
};

export const sortTodosByDate = (todos: ITodo[]) => {
	const filteresTodos = todos.filter((todo) => !todo.completed);

	const todosCopy = [...filteresTodos];

	return todosCopy.sort((a, b) => {
		const dateA = a.date ? new Date(a.date).getTime() : Infinity;
		const dateB = b.date ? new Date(b.date).getTime() : Infinity;

		return dateA - dateB;
	});
};

export const getTodosForToday = (todos: ITodo[]) => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);

	return todos.filter((todo) => {
		if (!todo.completed && todo.date) {
			const todoDate = new Date(todo.date);
			todoDate.setHours(0, 0, 0, 0);
			return todoDate.getTime() === today.getTime();
		}
		return false;
	});
};

export const getTodosForCurrentWeek = (todos: ITodo[]) => {
	const today = new Date();
	const currentDayOfWeek = today.getDay();
	const firstDayOfWeek = new Date(
		today.setDate(
			today.getDate() - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)
		)
	);
	firstDayOfWeek.setHours(0, 0, 0, 0);

	const lastDayOfWeek = new Date(firstDayOfWeek);
	lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
	lastDayOfWeek.setHours(23, 59, 59, 999);

	return todos.filter((todo) => {
		if (!todo.completed && todo.date) {
			const todoDate = new Date(todo.date);
			return todoDate >= firstDayOfWeek && todoDate <= lastDayOfWeek;
		}
		return false;
	});
};

export const getCompletedTodos = (todos: ITodo[]) => {
	return todos.filter((todo) => {
		return todo.completed;
	});
};
