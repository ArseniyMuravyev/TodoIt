import { Button, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { FC } from "react";

export const ColorModeSwitcher: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isLight = colorMode === "light";
	return (
		<Button
			onClick={toggleColorMode}
			colorScheme={isLight ? "purple" : "orange"}
		>
			{isLight ? <Moon size="20" /> : <Sun size="20" />}
		</Button>
	);
};
