import { IconButton, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { FC } from "react";

const MotionIconButton = motion(IconButton);

export const ColorModeSwitcher: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();
	const switchIcon =
		colorMode === "light" ? <Moon size="20" /> : <Sun size="20" />;

	return (
		<MotionIconButton
			aria-label="Toggle theme"
			onClick={toggleColorMode}
			colorScheme={useColorModeValue("purple", "orange")}
			icon={
				<AnimatePresence>
					<motion.div
						key={colorMode}
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.3 }}
					>
						{switchIcon}
					</motion.div>
				</AnimatePresence>
			}
		/>
	);
};
