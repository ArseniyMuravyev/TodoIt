import { ITodo } from "@arseniy/types";
import { Flex, List } from "@chakra-ui/react";
import { FC } from "react";
import { AddTodoButton } from "./AddTodoButton";
import { TodoCard } from "./TodoCard";

interface ITodoContainer {
	title: string;
	todos: ITodo[];
}

export const TodoContainer: FC<ITodoContainer> = ({ title, todos }) => {
	return (
		<Flex mt="8" alignItems="center" flexDirection="column">
			<List>
				{todos.map((todo: ITodo) => (
					<TodoCard todo={todo} key={todo._id} />
				))}
			</List>
			<AddTodoButton />
		</Flex>
	);
};
