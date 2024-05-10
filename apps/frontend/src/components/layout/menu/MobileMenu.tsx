import { Flex, Slide, Stack, Text } from "@chakra-ui/react";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Modal } from "../../modal/Modal";
import { SearchModal } from "../../modal/SearchModal";
import { ColorModeSwitcher } from "../header/ColorModeSwitcher";
import { SearchButton } from "../header/SearchButton";
import { Translator } from "../header/Translator";
import { UserButton } from "../header/UserButton";

interface IMobileMenu {
	isOpen: boolean;
	colorMode: "light" | "dark";
	onToggle: () => void;
}

export const MobileMenu: FC<IMobileMenu> = ({
	isOpen,
	onToggle,
	colorMode,
}) => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleClick = () => {
		setIsModalOpen((prev) => !prev);
	};

	const handleClose = () => {
		setIsModalOpen(false);
	};

	return (
		<Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
			<Flex
				p="5"
				mt="0"
				bg={colorMode === "dark" ? "#1a202c" : "#fff"}
				rounded="md"
				shadow="md"
				w="full"
				h="100vh"
				position="absolute"
				top="0"
				left="0"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
			>
				<Stack as="nav" spacing="8" textAlign="center">
					<NavLink to="/" onClick={onToggle}>
						<Text fontSize="md"> {t("navigation.home")}</Text>
					</NavLink>
					<NavLink to="/todos" onClick={onToggle} data-cy="todos">
						<Text fontSize="md">{t("navigation.my_todos")}</Text>
					</NavLink>
					<SearchButton handleClick={handleClick} />
					<UserButton onClick={onToggle} />
					<ColorModeSwitcher />
					<Translator />
				</Stack>
			</Flex>
			{isModalOpen && (
				<Modal title={t("search.search")} handleClose={handleClose}>
					<SearchModal />
				</Modal>
			)}
		</Slide>
	);
};
