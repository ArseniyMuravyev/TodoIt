import { ITodo } from "@arseniy/types";
import { Flex, Heading, List } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AddTodoButton } from "./AddTodoButton";
import { TodoCard } from "./TodoCard";

interface ITodoContainer {
	title: string;
	todos: ITodo[];
}

export const TodoContainer: FC<ITodoContainer> = ({ title, todos }) => {
	const { t } = useTranslation();
	let translatedTitle: string;

	switch (title) {
		case "todos.all_todos":
			translatedTitle = t("todos.all_todos");
			break;
		case "todos.today":
			translatedTitle = t("todos.today");
			break;
		case "todos.this_week":
			translatedTitle = t("todos.this_week");
			break;
		case "todos.completed":
			translatedTitle = t("todos.completed");
		default:
			translatedTitle = title;
	}

	return (
		<Flex mt="8" alignItems="center" flexDirection="column">
			<Heading as="h2" size="md" mb="4">
				{translatedTitle}
			</Heading>
			<List>
				{todos.map((todo: ITodo) => (
					<TodoCard todo={todo} key={todo._id} />
				))}
			</List>
			<AddTodoButton />
		</Flex>
	);
};
