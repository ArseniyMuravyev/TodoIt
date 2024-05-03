import { Flex, Slide, Stack } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Translator } from "./Translator";
import { UserButton } from "./UserButton";

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
						{t("navigation.home")}
					</NavLink>
					<NavLink to="/todos" onClick={onToggle} data-cy="todos">
						{t("navigation.my_todos")}
					</NavLink>
					<UserButton onClick={onToggle} />
					<ColorModeSwitcher />
					<Translator />
				</Stack>
			</Flex>
		</Slide>
	);
};
