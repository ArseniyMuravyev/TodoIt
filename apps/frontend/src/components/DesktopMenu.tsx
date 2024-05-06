import { Flex } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { desktopDisplay } from "../styles";

export const DesktopMenu: FC = () => {
	const { t } = useTranslation();
	return (
		<Flex gap="24" display={desktopDisplay}>
			<NavLink
				to="/"
				style={({ isActive }) => {
					return {
						color: isActive ? "gray" : "",
					};
				}}
			>
				{t("navigation.home")}
			</NavLink>
			<NavLink
				to="/todos"
				style={({ isActive }) => {
					return {
						color: isActive ? "gray" : "",
					};
				}}
				data-cy="todos"
			>
				{t("navigation.my_todos")}
			</NavLink>
		</Flex>
	);
};
