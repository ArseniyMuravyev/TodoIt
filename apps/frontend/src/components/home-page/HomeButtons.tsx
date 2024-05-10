import { Button, Flex, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const HomeButtons: FC = () => {
	const { t, i18n } = useTranslation();
	return (
		<Flex mt="6" alignItems="center" flexDirection="column">
			<Text textAlign="center" fontSize="xl">
				{t("home.title_description")}
			</Text>
			<Flex mt="6" gap={{ base: "2", md: "8" }}>
				<Button
					w={i18n.language === "ru" ? "42" : "24"}
					colorScheme="telegram"
					_hover={{
						transform: "scale(1.1)",
						boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
					}}
				>
					<Link to="/register">
						<Text>{t("user.signUp")}</Text>
					</Link>
				</Button>
				<Button
					w={i18n.language === "ru" ? "44" : "24"}
					colorScheme="pink"
					_hover={{
						transform: "scale(1.1)",
						boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.15)",
					}}
				>
					<Link to="/login">
						<Text>{t("user.login")}</Text>
					</Link>
				</Button>
			</Flex>
		</Flex>
	);
};
