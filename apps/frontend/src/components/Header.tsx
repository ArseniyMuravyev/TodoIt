import {
	Box,
	Flex,
	IconButton,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { FC } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { DesktopMenu } from "./DesktopMenu";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { Translator } from "./Translator";
import { UserButton } from "./UserButton";

export const Header: FC = () => {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode } = useColorMode();

	return (
		<Box as="header" px="4">
			<Flex
				justifyContent={{ base: "space-evenly", lg: "space-between" }}
				alignItems="center"
				maxH="20"
			>
				<Logo />
				<IconButton
					display={{ base: "flex", lg: "none" }}
					onClick={onToggle}
					icon={isOpen ? <X /> : <Menu />}
					variant={"outline"}
					aria-label={"Toggle Navigation"}
				/>
				<Box as="nav">
					<DesktopMenu />

					{isOpen && (
						<MobileMenu
							isOpen={isOpen}
							colorMode={colorMode}
							onToggle={onToggle}
						/>
					)}
				</Box>
				<Flex
					gap="8"
					alignItems="center"
					justifyContent="center"
					display={{ base: "none", lg: "flex" }}
				>
					<UserButton />
					<ColorModeSwitcher />
					<Translator />
				</Flex>
			</Flex>
		</Box>
	);
};
