import { Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { useSelector } from "../../../store/store";
import { desktopDisplay } from "../../../styles";
import { Modal } from "../../modal/Modal";
import { SearchModal } from "../../modal/SearchModal";
import { SearchButton } from "../header/SearchButton";

export const DesktopMenu: FC = () => {
	const { t } = useTranslation();
	const [isOpen, setIsOpen] = useState(false);
	const user = useSelector((state) => state.user.user);

	const handleClick = () => {
		if (user) {
			setIsOpen((prev) => !prev);
		}
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<Flex
			gap="16"
			alignItems="center"
			justifyContent="center"
			display={desktopDisplay}
		>
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
			<SearchButton handleClick={handleClick} />

			{isOpen && (
				<Modal title={t("search.search")} handleClose={handleClose}>
					<SearchModal />
				</Modal>
			)}
		</Flex>
	);
};
