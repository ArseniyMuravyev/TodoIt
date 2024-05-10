import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "../../store/store";

export const GetStarted: FC = () => {
	const { t } = useTranslation();
	const todos = useSelector((state) => state.todo.todos);

	return (
		!todos.length && (
			<Flex alignItems="center" justifyContent="center" mt="4">
				<Link to="/todos">
					<Text fontSize="xl" color="blue.500" textAlign="center">
						{t("todos.first_todo")}
					</Text>
				</Link>
			</Flex>
		)
	);
};
