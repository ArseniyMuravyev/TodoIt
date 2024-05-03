import {
	Flex,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
} from "@chakra-ui/react";
import { t } from "i18next";
import { FC } from "react";
import { Pagination } from "./Pagination";
import { TodoContainer } from "./TodoContainer";
import { PaginationStates } from "./TodoList";

interface IDesktopTodoList {
	pagination: PaginationStates;
	pageSize: number;
	onPageChange: (newPage: number, activeTab: string) => void;
}

export const DesktopTodoList: FC<IDesktopTodoList> = ({
	pagination,
	pageSize,
	onPageChange,
}) => {
	return (
		<Flex mt="8">
			<Tabs variant="soft-rounded" w="100%" isFitted>
				<TabList>
					<Tab>{t("todos.all_todos")}</Tab>
					<Tab>{t("todos.today")}</Tab>
					<Tab>{t("todos.this_week")}</Tab>
					<Tab>{t("todos.completed")}</Tab>
				</TabList>
				<TabPanels>
					{Object.entries(pagination).map(
						([listTitle, { currentPage, todos }]) => {
							const lastIndex = currentPage * pageSize;
							const firstIndex = lastIndex - pageSize;
							const currentTodos = todos.slice(firstIndex, lastIndex);

							return (
								<TabPanel key={listTitle}>
									<TodoContainer title={listTitle} todos={currentTodos} />
									<Pagination
										currentPage={currentPage}
										totalCount={todos.length}
										pageSize={pageSize}
										onPageChange={(newPage) => onPageChange(newPage, listTitle)}
									/>
								</TabPanel>
							);
						}
					)}
				</TabPanels>
			</Tabs>
		</Flex>
	);
};
