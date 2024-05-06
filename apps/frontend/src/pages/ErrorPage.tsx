import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { Link, useRouteError } from "react-router-dom";

type ErrorResponse = {
	data: unknown;
	status: number;
	statusText: string;
	message?: string;
};

const ErrorPage = () => {
	const { t } = useTranslation();
	const error = useRouteError() as ErrorResponse;

	return (
		<Flex
			flexDirection="column"
			justifyContent="center"
			alignItems="center"
			w="100%"
			h="100vh"
			gap="12"
		>
			<Heading as="h1">{t("home.error_title")}</Heading>
			<Text>{t("home.error_description")}</Text>
			<Text color="gray.600" as="i">
				{error.statusText}
			</Text>
			<Link to="/">
				<Button colorScheme="teal">{t("error.home")}</Button>
			</Link>
		</Flex>
	);
};

export default ErrorPage;
