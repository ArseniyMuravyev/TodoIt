import { Input, InputGroup, InputRightElement, List } from "@chakra-ui/react";
import { Search } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import useDebounce from "../../hooks/useDebounce";
import { useSelector } from "../../store/store";
import { TodoCard } from "../todo-page/TodoCard";

export const SearchModal = () => {
	const { t } = useTranslation();
	const todos = useSelector((state) => state.todo.todos);
	const [query, setQuery] = useState("");
	const [filteredTodos, setFilteredTodos] = useState(todos);

	useDebounce(
		() => {
			setFilteredTodos(
				todos.filter((todo) =>
					todo.title.toLowerCase().includes(query.toLowerCase())
				)
			);
		},
		[todos, query],
		200
	);

	const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) =>
		setQuery(e.target.value);

	return (
		<>
			<InputGroup size="md">
				<Input
					pr="4.5rem"
					placeholder={t("search.placeholder")}
					value={query ?? ""}
					onChange={handleSearchChange}
				/>
				<InputRightElement width="4.5rem">
					<Search />
				</InputRightElement>
			</InputGroup>
			<List mt="2">
				{filteredTodos.map((todo) => (
					<TodoCard todo={todo} key={todo._id} />
				))}
			</List>
		</>
	);
};
