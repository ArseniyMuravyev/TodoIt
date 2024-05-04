import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useSelector } from "../store/store";

const Home: FC = () => {
	const user = useSelector((state) => state.user.user);
	const { t, i18n } = useTranslation();

	return (
		<Box mt="8">
			<Heading textAlign="center" as="h1">
				{t("home.title")}
			</Heading>
			{!user && (
				<Flex mt="6" alignItems="center" flexDirection="column">
					<Text textAlign="center" fontSize="xl">
						{t("home.title_description")}
					</Text>
					<Flex mt="6" gap="8">
						<Button
							w={i18n.language === "ru" ? "48" : "24"}
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
							w={i18n.language === "ru" ? "48" : "24"}
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
			)}
		</Box>
	);
};

export default Home;
