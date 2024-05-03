import { Button, Flex, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pagination } from "./Pagination";
import { TodoContainer } from "./TodoContainer";
import { PaginationStates } from "./TodoList";

interface IMobileTodoList {
	pagination: PaginationStates;
	pageSize: number;
	onPageChange: (newPage: number, activeTab: string) => void;
}

export const MobileTodoList: FC<IMobileTodoList> = ({
	pagination,
	pageSize,
	onPageChange,
}) => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = useState<string>(t("todos.all_todos"));

	const handleNextTab = () => {
		const tabTitles = [
			t("todos.all_todos"),
			t("todos.today"),
			t("todos.this_week"),
			t("todos.completed"),
		];
		const currentIndex = tabTitles.indexOf(activeTab);
		const nextIndex = (currentIndex + 1) % tabTitles.length;
		setActiveTab(tabTitles[nextIndex]);
	};

	const handlePrevTab = () => {
		const tabTitles = [
			t("todos.all_todos"),
			t("todos.today"),
			t("todos.this_week"),
			t("todos.completed"),
		];
		const currentIndex = tabTitles.indexOf(activeTab);
		const prevIndex = (currentIndex - 1 + tabTitles.length) % tabTitles.length;
		setActiveTab(tabTitles[prevIndex]);
	};

	return (
		<Flex mt="8" direction="column" w="100%">
			<Flex justifyContent="space-between" alignItems="center" px={2}>
				<Button onClick={handlePrevTab}>{"<"}</Button>
				<Text>{activeTab}</Text>
				<Button onClick={handleNextTab}>{">"}</Button>
			</Flex>
			<TodoContainer
				title={activeTab}
				todos={pagination[activeTab]?.todos.slice(
					(pagination[activeTab].currentPage - 1) * pageSize,
					pagination[activeTab].currentPage * pageSize
				)}
			/>
			<Pagination
				currentPage={pagination[activeTab].currentPage}
				totalCount={pagination[activeTab]?.todos.length}
				pageSize={pageSize}
				onPageChange={(newPage) => onPageChange(newPage, activeTab)}
			/>
		</Flex>
	);
};
