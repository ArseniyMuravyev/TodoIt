import { Button, useColorMode } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { FC } from "react";

export const ColorModeSwitcher: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Button onClick={toggleColorMode}>
			{colorMode === "light" ? <Moon size="20" /> : <Sun size="20" />}
		</Button>
	);
};
