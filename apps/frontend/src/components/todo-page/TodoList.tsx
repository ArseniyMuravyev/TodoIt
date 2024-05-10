import { ITodo } from "@arseniy/types";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "../../store/store";
import {
	getCompletedTodos,
	getTodosForCurrentWeek,
	getTodosForToday,
	sortTodosByDate,
} from "../../utils/helpers";
import { DesktopTodoList } from "./DesktopTodoList";
import { MobileTodoList } from "./MobileTodoList";

type PaginationState = {
	currentPage: number;
	todos: ITodo[];
};

export type PaginationStates = Record<string, PaginationState>;

export const TodoList: FC = () => {
	const todos = useSelector((state) => state.todo.todos);
	const sortedTodos = sortTodosByDate(todos);
	const todayTodos = getTodosForToday(todos);
	const weekTodos = getTodosForCurrentWeek(todos);
	const completedTodos = getCompletedTodos(todos);
	const { t } = useTranslation();

	const isMobile = useMediaQuery({ maxWidth: 767 });

	const pageSize = 10;
	const [pagination, setPagination] = useState<PaginationStates>({
		[t("todos.all_todos")]: { currentPage: 1, todos: sortedTodos },
		[t("todos.today")]: { currentPage: 1, todos: todayTodos },
		[t("todos.this_week")]: { currentPage: 1, todos: weekTodos },
		[t("todos.completed")]: { currentPage: 1, todos: completedTodos },
	});

	useEffect(() => {
		setPagination({
			[t("todos.all_todos")]: { currentPage: 1, todos: sortTodosByDate(todos) },
			[t("todos.today")]: { currentPage: 1, todos: getTodosForToday(todos) },
			[t("todos.this_week")]: {
				currentPage: 1,
				todos: getTodosForCurrentWeek(todos),
			},
			[t("todos.completed")]: {
				currentPage: 1,
				todos: getCompletedTodos(todos),
			},
		});
	}, [todos, t]);

	const onPageChange = (
		pageNumber: number,
		listTitle: keyof PaginationStates
	) => {
		const maxPage = Math.ceil(pagination[listTitle].todos.length / pageSize);
		if (pageNumber < 1 || pageNumber > maxPage) {
			return;
		}

		setPagination((prev) => ({
			...prev,
			[listTitle]: {
				...prev[listTitle],
				currentPage: pageNumber,
			},
		}));
	};

	if (isMobile) {
		return (
			<MobileTodoList
				pagination={pagination}
				onPageChange={onPageChange}
				pageSize={pageSize}
			/>
		);
	} else {
		return (
			<DesktopTodoList
				pagination={pagination}
				onPageChange={onPageChange}
				pageSize={pageSize}
			/>
		);
	}
};
