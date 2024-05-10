import { Button, Flex, Text } from "@chakra-ui/react";
import { Plus } from "lucide-react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { CreateTodoInput } from "./CreateTodoInput";

export const AddTodoButton: FC = () => {
	const [isAddTodoButtonVisible, setIsAddTodoButtonVisible] = useState(true);
	const [isInputVisible, setIsInputVisible] = useState(false);
	const { t } = useTranslation();

	const handleClick = () => {
		setIsInputVisible((prev) => !prev);
		setIsAddTodoButtonVisible((prev) => !prev);
	};

	return (
		<>
			{isAddTodoButtonVisible && (
				<Button onClick={handleClick} mt="4">
					<Flex gap="2" alignItems="center">
						<Plus size="20" color="#f4bab7" />
						<Text as="span">{t("todos.add_task")}</Text>
					</Flex>
				</Button>
			)}
			{isInputVisible && (
				<CreateTodoInput
					setIsInputVisible={setIsInputVisible}
					setIsAddTodoButtonVisible={setIsAddTodoButtonVisible}
				/>
			)}
		</>
	);
};
