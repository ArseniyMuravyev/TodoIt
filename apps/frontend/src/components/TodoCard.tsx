import { ITodo } from "@arseniy/types";
import { Button, Flex, ListItem, Text } from "@chakra-ui/react";
import { Check, Circle } from "lucide-react";
import { FC, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { completeTodo } from "../features/todo/actions";
import { useDispatch } from "../store/store";
import { formatDate } from "../utils/helpers";

interface ITodoCard {
	todo: ITodo;
}

export const TodoCard: FC<ITodoCard> = ({ todo }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [isHovered, setIsHovered] = useState(false);

	const handleClick = () => {
		dispatch(completeTodo(todo));
	};

	return (
		<ListItem w="100%" isTruncated>
			<Flex alignItems="center" gap="2" mb="2">
				<Button
					mt="1"
					bg="transparent"
					size="2xs"
					onClick={handleClick}
					borderRadius="50%"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					_hover={{ bg: "transparent" }}
				>
					{isHovered ? <Check /> : <Circle />}
				</Button>
				<Link
					to={`/todos/${todo._id}`}
					state={{ backgroundLocation: location }}
				>
					<Text
						fontSize="xl"
						data-cy="todo"
						style={{
							textDecoration: todo.completed ? "line-through" : "none",
						}}
					>
						{todo.title}
					</Text>
				</Link>
				{todo.date && (
					<Text
						mt="1"
						fontSize="sm"
						color="gray.500"
						style={{
							color:
								new Date(todo.date).setHours(0, 0, 0, 0) <
									new Date().setHours(0, 0, 0, 0) && !todo.completed
									? "red"
									: "",
						}}
					>
						{formatDate(todo.date.toString())}
					</Text>
				)}
			</Flex>
		</ListItem>
	);
};
