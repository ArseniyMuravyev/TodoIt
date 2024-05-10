import {
	Box,
	Flex,
	IconButton,
	useColorMode,
	useDisclosure,
} from "@chakra-ui/react";
import { Menu, X } from "lucide-react";
import { FC } from "react";
import { desktopDisplay, mobileDisplay } from "../../../styles";
import { DesktopMenu } from "../menu/DesktopMenu";
import { MobileMenu } from "../menu/MobileMenu";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Logo } from "./Logo";
import { Translator } from "./Translator";
import { UserButton } from "./UserButton";

export const Header: FC = () => {
	const { isOpen, onToggle } = useDisclosure();
	const { colorMode } = useColorMode();

	return (
		<Box as="header">
			<Flex justifyContent="space-between" alignItems="center" maxH="20">
				<Logo />
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
				<IconButton
					display={mobileDisplay}
					onClick={onToggle}
					icon={isOpen ? <X /> : <Menu />}
					variant="outline"
					aria-label="Toggle Navigation"
				/>
			</Flex>
		</Box>
	);
};
