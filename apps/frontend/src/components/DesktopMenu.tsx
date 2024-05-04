import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

export const DesktopMenu: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex gap="24" display={{ base: "none", lg: "flex" }}>
			<NavLink
				to="/"
				style={({ isActive }) => {
					return {
						color: isActive ? "gray.500" : "",
					};
				}}
			>
				{t("navigation.home")}
			</NavLink>
			<NavLink
				to="/todos"
				style={({ isActive }) => {
					return {
						color: isActive ? "gray.500" : "",
					};
				}}
				data-cy='todos'
			>
				{t("navigation.my_todos")}
			</NavLink>
		</Flex>
	);
};
