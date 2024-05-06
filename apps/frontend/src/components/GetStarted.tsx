import { Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const GetStarted: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex alignItems="center" justifyContent="center" mt="4">
			<Link to="/todos">
				<Text fontSize="xl" color="blue.500" textAlign="center">{t("todos.first_todo")}</Text>
			</Link>
		</Flex>
	);
};
