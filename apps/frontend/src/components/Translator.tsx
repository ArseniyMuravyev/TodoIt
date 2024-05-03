import {
	Button,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import { ChevronDownIcon, Languages } from "lucide-react";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const Translator: FC = () => {
	const { i18n } = useTranslation();

	const handleChangeRussianLanguage = () => {
		i18n.changeLanguage("ru");
	};

	const handleChangeEnglishLanguage = () => {
		i18n.changeLanguage("en");
	};

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						isActive={isOpen}
						as={Button}
						rightIcon={<ChevronDownIcon />}
					>
						<Languages />
					</MenuButton>
					<MenuList>
						<MenuItem onClick={handleChangeRussianLanguage}>
							Русский&nbsp;
							<Text as="span" role="img" aria-label="flag of Russia">
								🇷🇺
							</Text>
						</MenuItem>
						<MenuItem onClick={handleChangeEnglishLanguage}>
							English&nbsp;
							<Text as="span" role="img" aria-label="flag of United Kingdom">
								🇬🇧
							</Text>
						</MenuItem>
					</MenuList>
				</>
			)}
		</Menu>
	);
};
