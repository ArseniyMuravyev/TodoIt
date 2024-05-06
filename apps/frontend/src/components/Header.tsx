import {
	Box,
	Flex,
	IconButton,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { FC } from "react";
import { desktopDisplay, mobileDisplay, responsivePadding } from "../styles";
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
		<Box as="header" px={responsivePadding}>
			<Flex
				justifyContent={{ base: "space-evenly", md: "space-between" }}
				alignItems="center"
				maxH="20"
			>
				<Logo />
				<IconButton
					display={mobileDisplay}
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
					gap="4"
					alignItems="center"
					justifyContent="center"
					display={desktopDisplay}
				>
					<UserButton />
					<ColorModeSwitcher />
					<Translator />
				</Flex>
			</Flex>
		</Box>
	);
};
